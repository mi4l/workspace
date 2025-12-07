import type { StorageProvider } from "../../core/storage/StorageProvider";

type MemoryStore = Readonly<Record<string, unknown>>;

const readKey =
  <T>(key: string) =>
  (state: MemoryStore): T | null =>
    Object.hasOwn(state, key) ? (state[key] as T) : null;

const writeKey =
  <T>(key: string, value: T) =>
  (state: MemoryStore): MemoryStore => ({ ...state, [key]: value });

const dropKey =
  (key: string) =>
  (state: MemoryStore): MemoryStore =>
    Object.fromEntries(Object.entries(state).filter(([candidate]) => candidate !== key));

const listKeys = (state: MemoryStore): readonly string[] => Object.keys(state);

const createInMemoryStorageProvider = (initialStore: MemoryStore = {}): StorageProvider => {
  let store = initialStore;

  const load: StorageProvider["load"] = <T>(key: string) => Promise.resolve(readKey<T>(key)(store));

  const save: StorageProvider["save"] = async (key, value) => {
    store = writeKey(key, value)(store);
  };

  const remove: StorageProvider["remove"] = async (key) => {
    store = dropKey(key)(store);
  };

  const list: StorageProvider["listKeys"] = async () => listKeys(store);

  return {
    load,
    save,
    remove,
    listKeys: list,
  };
};

export { createInMemoryStorageProvider };
