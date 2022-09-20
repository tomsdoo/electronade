# getting started

Let's get started.
1. Installation
1. Installation of `electronade package`
1. call `setHandles()` in main process
1. generate config file
1. generate `preload.ts`
1. call from renderer process

***

## 1. Installation
Install electronade.

``` shell
npm install electronade
```
## 2. Installation of `electronade package`

`electronade-os` for example.

``` shell
npm install electronade-os
```

## 3. call `setHandles()` in main process

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

## 4. generate config file

`electronade.config.js` will be created in your project root.
And you can edit it. see [config file](./config_file.md) details.

``` shell
npx electronade --init
```

## 5. generate `preload.ts`

`preload.ts` will be generated.

``` shell
npx electronade --prepare-preload
```

## 6. call from renderer process

``` html
<script>
(async () => {
  console.log(
    await electronade.os.tmpdir()
  );
})();
</script>
```
