# How to change the exposed name for renderer

electronade CLI generates `preload.ts` according to [config file](#/md/config_file).

`input.exposingName` is the definition of the exposed name for renderer process.  
And its value is `electronade` as default(`electronade --init`).

Change `input.exposingName` if you want to change the exposed name for renderer.

## example
`config.js`
``` javascript
module.exports = {
  input: {
    exposingName: "custom"
  }
};
```

`renderer process`
``` html
<script>
await custom.some.method();
</script>
```
