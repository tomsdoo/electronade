import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { setHandles } from "../src/main/";

const ipcMain: {
  handle: (eventName: string, handler: Function) => undefined;
} = {
  handle: () => undefined,
};

describe("setHandles", () => {
  it("calling", () => {
    const [eventName, handler] = ["event name", () => undefined];
    const mocked = mock(ipcMain);
    mocked
      .expects("handle")
      .once()
      .withArgs(eventName, handler)
      .returns(undefined);

    assert.equal(
      // eslint-disable-next-line
      eval(setHandles.toString())({
        testHandles: [{ eventName, handler }],
      }),
      undefined
    );

    mocked.verify();
    mocked.restore();
  });
});
