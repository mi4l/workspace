import { createAppController } from "./AppController";
import type { StorageProvider } from "./storage/StorageProvider";

const createStubStorage = (): StorageProvider => ({
  listDocuments: async () => [],
  readDocument: async () => null,
  writeDocument: async () => {},
  deleteDocument: async () => {},
  listFolders: async () => [],
  createFolder: async (_workspaceId, parentId, name) => ({
    id: "folder-id",
    name,
    parentId,
    path: name,
  }),
  deleteFolder: async () => {},
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
