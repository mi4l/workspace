/**
 * Defines the minimal contract for storing and retrieving app state.
 * Infra implementations should satisfy this interface without leaking platform details.
 */
export interface StorageProvider {
  load: <T>(key: string) => Promise<T | null>;
  save: <T>(key: string, value: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
  listKeys: () => Promise<readonly string[]>;
}
