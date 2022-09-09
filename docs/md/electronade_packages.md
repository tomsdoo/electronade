# electronade packages

A electronade package is a kind of npm package that is made for electronade use.

You can use electronade packages without understanding what they are. But knowing what are exported helps you to make the custom electronade packages if you want it.

## exports

|name|description|
|:--|:--|
|handles|array of handle objects|
|preloadObject|an object that will be merged into generated preload file|

The sttuctures of `electronade package` are like below, though they are not classes strictly.
``` mermaid
classDiagram

class electronade_package {
  +Hnalde[] handles
  +PreloadObject preloadObject
}

class Handle {
  +string eventName
  +Function handler
}

class PreloadObject {
  +MethodContainer [name defined by package]
}

class MethodContainer {
  +methodName1(args) Promise~any~
  +methodName2(args) Promise~any~
}

electronade_package o-- Handle
electronade_package o-- PreloadObject
PreloadObject o-- MethodContainer
```

***

## handles

handles should be an array of handle objects each of what has `eventName` and `handler`.

### eventName
`eventName` is used as IPC event name, and eventNames are unique in each other of an electron project.

### handler
`handler` is a function that accepts `event` and other arguments as the parameters.

``` typescript
handler: (event: any, ...args: any[]) => Promise<any>
```

***

## preloadObject

electronade expects `preloadObject` as an object that has one or more properties that each property has one or more methods.

The methods of the properties are mostly just the invokers for `ipcRenderer`.
