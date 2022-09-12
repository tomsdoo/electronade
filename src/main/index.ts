// eslint-disable-next-line
const { ipcMain } = require("electron");

interface Handle {
  eventName: string;
  handler: Function;
}
interface Handles {
  [key: string]: Handle[];
}

export const setHandles: (handles: Handles) => any = (handles: Handles) => {
  Object.values(handles).forEach((arrayOfHandles) => {
    arrayOfHandles.forEach(({ eventName, handler }) => {
      ipcMain.handle(eventName, handler);
    });
  });
};
