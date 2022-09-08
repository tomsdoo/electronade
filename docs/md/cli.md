# CLI

electronade CLI helps you..
- to prepare `preload.ts`
- to create default config file for electronade

## help

electronade CLI shows the help for it.

``` shell
npx electronade --help
```

## initialize

electronade CLI creates a default config file.

``` shell
npx electronade --init
```

## prepare preload file

electronade CLI prepares a preload file according to its config file.

``` shell
npx electronade --prepare-preload
```

## prepare preload file with config file explicitly

electronade CLI recognizes the config file with command line option `--config`.

`electronade.config.js` will be adopted as a config file if `--config` does not exist.


``` shell
npx electronade --prepare-preload --config some/electronade.config.js
```
