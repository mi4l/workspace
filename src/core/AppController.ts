import { createInMemoryStorageProvider } from "../infra/storage/inMemoryStorageProvider";
import type { StorageProvider } from "./storage/StorageProvider";

export type AppController = {
  bootstrap: () => Promise<void>;
  storage: () => StorageProvider;
};

const createAppController = (
  storageProvider: StorageProvider = createInMemoryStorageProvider()
): AppController => {
  const bootstrap = async () => Promise.resolve();
  const storage = () => storageProvider;

  return {
    bootstrap,
    storage,
  };
};

export { createAppController };
