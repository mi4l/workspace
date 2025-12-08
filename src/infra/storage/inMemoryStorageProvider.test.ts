import { createInMemoryStorageProvider } from "./inMemoryStorageProvider";

const createDocument = (id: string) => ({
  id,
  title: `Doc ${id}`,
  path: id,
  updatedAt: "2023-01-01T00:00:00.000Z",
  content: { type: "doc", content: [] },
});

describe("createInMemoryStorageProvider", () => {
  it("returns null for missing documents", async () => {
    const storage = createInMemoryStorageProvider();

    const missing = await storage.readDocument("workspace", "missing");

    expect(missing).toBeNull();
  });

  it("stores and lists documents per workspace", async () => {
    const storage = createInMemoryStorageProvider();
    const doc = createDocument("doc-1");

    await storage.writeDocument("workspace", doc);

    expect(await storage.readDocument("workspace", doc.id)).toEqual(doc);
    expect(await storage.listDocuments("workspace")).toEqual([doc]);

    await storage.deleteDocument("workspace", doc.id);

    expect(await storage.readDocument("workspace", doc.id)).toBeNull();
    expect(await storage.listDocuments("workspace")).toEqual([]);
  });

  it("creates and removes folders", async () => {
    const storage = createInMemoryStorageProvider();

    const folder = await storage.createFolder("workspace", null, "Root");

    expect(folder.name).toBe("Root");
    expect(await storage.listFolders("workspace")).toEqual([folder]);

    await storage.deleteFolder("workspace", folder.id);

    expect(await storage.listFolders("workspace")).toEqual([]);
  });
});
