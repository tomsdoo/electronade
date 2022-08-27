const { ipcMain } = require("electron");

type Handle = {
  eventName: string;
  handler: Function;
};
type Handles = {
  [key: string]: Handle[];
};

export const setHandles = (handles: Handles) => {
  Object.values(handles)
    .forEach(arrayOfHandles => {
      arrayOfHandles.forEach(({ eventName, handler }) => {
        // @ts-ignore
        ipcMain.handle(eventName, handler);
      });
    });
};
