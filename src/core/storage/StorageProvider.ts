export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonObject = { readonly [key: string]: JsonValue };

export type JsonArray = readonly JsonValue[];

export type DocumentContent = JsonObject;

export interface DocumentMeta {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly updatedAt: string;
}

export interface DocumentModel extends DocumentMeta {
  readonly content: DocumentContent;
}

export interface FolderMeta {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly path?: string;
}

export interface StorageProvider {
  listDocuments: (workspaceId: string) => Promise<ReadonlyArray<DocumentMeta>>;
  readDocument: (workspaceId: string, docId: string) => Promise<DocumentModel | null>;
  writeDocument: (workspaceId: string, doc: DocumentModel) => Promise<void>;
  deleteDocument: (workspaceId: string, docId: string) => Promise<void>;
  listFolders: (workspaceId: string) => Promise<ReadonlyArray<FolderMeta>>;
  createFolder: (workspaceId: string, parentId: string | null, name: string) => Promise<FolderMeta>;
  deleteFolder: (workspaceId: string, folderId: string) => Promise<void>;
}
