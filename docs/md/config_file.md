# config file

electronade config file is a `.js` file that contains the information of the configuration for electronade.

## example
``` javascript
/*
  you can require some preloadobjects from electronade packages
  electronade-os for example
*/
const {
  preloadObject: osPreload
} = require("electronade-os");

module.exports = {
  input: {
    baseFile: "path/to/baseFile",
    exposingName: "electronade",
    preloadObjects: {
      osPreload
    }
  },
  output: {
    file: "path/to/generatedFile"
  }
};
```

## preparing default config file

You can create a default config file by executing below.

``` shell
npx electronade --init
```

## exported properties

|name|description|
|:--|:--|
|input|input values for preparation process|
|output|putput values for preparation process|

### properties in exported `input`

|name|description|example|
|:--|:--|:--|
|baseFile|base file that contains custom preload script|`sone/dir/preload_base.ts`|
|exposingName|name that will be exposed in preload file|electronade|
|preloadObjects|preloadObjects from `electronade packages` that you want expose to renderer process|{ somePreloadObject }|

### properties in exported `output`

|name|description|example|
|:--|:--|:--|
|file|file path of output file|`some/dir/preload.ts`|
