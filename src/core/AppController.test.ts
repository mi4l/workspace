import { createAppController } from "./AppController";
import type { StorageProvider } from "./storage/StorageProvider";

const createStubStorage = (): StorageProvider => ({
  load: async () => null,
  save: async () => {},
  remove: async () => {},
  listKeys: async () => [],
});

describe("createAppController", () => {
  it("resolves bootstrap", async () => {
    const controller = createAppController();

    await expect(controller.bootstrap()).resolves.toBeUndefined();
  });

  it("returns the same storage provider each time", () => {
    const controller = createAppController();

    expect(controller.storage()).toBe(controller.storage());
  });

  it("uses the provided storage provider", () => {
    const storage = createStubStorage();
    const controller = createAppController(storage);

    expect(controller.storage()).toBe(storage);
  });
});
