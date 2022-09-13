# electronade

It's a framework helper for the electron projects.

![npm](https://img.shields.io/npm/v/electronade)
![NPM](https://img.shields.io/npm/l/electronade)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade)
![Maintenance](https://img.shields.io/maintenance/yes/2022)


# Installation

``` shell
npm install electronade
```

# Usage

See [electronade.netlify.app](https://electronade.netlify.app/) for details.

### setting handles from electronade packages
`main.ts`
``` typescript
import { app } from "electron";
import { setHandles } from "electronade";
import { handles as someHandles } from "electronade-some";
import { handles as otherHandles } from "electronade-other";

app.whenReady().then(() => {
  setHandles({
    someHandles,
    otherHandles
  });
});
```

### exposing from electronade packages
get ready for generation of preload file, base file should exist
`preload_base.ts`
``` typescript
import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent
} from "electron";

contextBridge.exposeInMainWorld("ownAPI", {
  mine: {
    work: (message: string) =>
      ipcRenderer.invoke("mine:work", message)
  }
});
```

initialize config file for preload preparation.
`electronade.config.js` will be generated.
``` shell
npx electronade --init
```

edit `electronade.config.js`
``` javascript
const { preloadObject: somePreload } = require("electronade-some");
const { preloadObject: otherPreload } = require("electronade-other");

module.exports = {
  input: {
    baseFile: "path/to/preload_base.ts",
    exposingName: "electronade",
    preloadObjects: {
      somePreload,
      otherPreload
    }
  },
  output: {
    file: "path/to/preload.ts"
  }
};
```

prepare merged preload file.
``` shell
npx electronade --prepare-preload --config electronade.config.js
```

### calling from renderer
``` javascript
const result1 = await electronade.some.work(params);
const result2 = await electronade.other.anotherWork();
const result3 = await ownAPI.mine.work("message");
```
