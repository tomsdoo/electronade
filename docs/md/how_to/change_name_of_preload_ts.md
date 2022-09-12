# How to change the name of preload.ts that will be generated by CLI

electronade CLI generates `preload.ts` according to [config file](#/md/config_file).

`output.file` is the definition of the file path that will be generated.

Change `output.file` if you want to change the file path that will be generated.

## example
`config.js`
``` javascript
module.exports = {
  output: {
    file: "path/to/preload.ts"
  }
};
```
***

## Can I use `preload.js` not `.ts`, as `output.file`?

Yes.  
Then, you should prepare the base file.

`preload_base.js`
``` javascript
const { contextBridge, ipcRenderer } = require("electron");

```

`config.js`
``` javascript
module.exports = {
  input: {
    baseFile: "path/to/preload_base.js"
  },
  output: {
    file: "path/to/preload.js"
  }
};
```