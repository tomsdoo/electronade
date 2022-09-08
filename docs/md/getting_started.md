# getting started

Let's get started.
1. Installation
1. Installation of `electronade package`
1. call `setHandles()` in main process
1. generate config file
1. generate `preload.ts`
1. call from renderer process

## Installation
Install electronade.

``` shell
npm install electronade
```

## Installation of `electronade package`

`electronade-os` for example.

``` shell
npm install electronade-os
```

## call `setHandles()` in main process

`setHandles()` sets the handles of `electronade package`.

`main.ts`

``` typescript
import { app } from "electron";
import { setHandles } from "electronade";
import { handles as osHandles } from "electronade-os";

app.whenReady().then(() => {
  setHandles({
    osHandles
  });
});
```

## generate config file

`electronade.config.js` will be created in your project root.
And you can edit it. see [config file](#/md/config_file) details.

``` shell
npx electronade --init
```

## generate `preload.ts`

`preload.ts` will be generated.

``` shell
npx electronade --prepare-preload
```

## call from renderer process

``` html
<script>
(async () => {
  console.log(
    await electronade.os.tmpdir()
  );
})();
</script>
```
