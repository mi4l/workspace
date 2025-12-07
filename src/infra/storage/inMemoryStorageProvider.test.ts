import { createInMemoryStorageProvider } from "./inMemoryStorageProvider";

describe("createInMemoryStorageProvider", () => {
  it("returns null for missing keys", async () => {
    const storage = createInMemoryStorageProvider();

    const missing = await storage.load("missing");

    expect(missing).toBeNull();
  });

  it("saves, reads, lists, and removes values", async () => {
    const storage = createInMemoryStorageProvider();

    await storage.save("token", "abc");
    await storage.save("count", 3);

    expect(await storage.load("token")).toBe("abc");
    expect(await storage.listKeys()).toEqual(["token", "count"]);

    await storage.remove("token");

    expect(await storage.load("token")).toBeNull();
    expect(await storage.listKeys()).toEqual(["count"]);
  });
});
