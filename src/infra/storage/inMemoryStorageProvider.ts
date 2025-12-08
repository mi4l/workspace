import type {
  DocumentModel,
  FolderMeta,
  StorageProvider,
} from "../../core/storage/StorageProvider";

type WorkspaceState = {
  documents: Map<string, DocumentModel>;
  folders: Map<string, FolderMeta>;
};

type Store = Map<string, WorkspaceState>;

const createWorkspaceState = (): WorkspaceState => ({
  documents: new Map(),
  folders: new Map(),
});

const selectWorkspace = (store: Store, workspaceId: string): WorkspaceState => {
  const existing = store.get(workspaceId);
  if (existing) return existing;
  const created = createWorkspaceState();
  store.set(workspaceId, created);
  return created;
};

const createFolderId = (): string => Math.random().toString(36).slice(2);

const derivePath = (parent: FolderMeta | undefined, name: string) =>
  parent?.path ? `${parent.path}/${name}` : name;

const createInMemoryStorageProvider = (): StorageProvider => {
  const store: Store = new Map();

  const listDocuments: StorageProvider["listDocuments"] = async (workspaceId) => {
    const workspace = selectWorkspace(store, workspaceId);
    return Array.from(workspace.documents.values());
  };

  const readDocument: StorageProvider["readDocument"] = async (workspaceId, docId) => {
    const workspace = selectWorkspace(store, workspaceId);
    return workspace.documents.get(docId) ?? null;
  };

  const writeDocument: StorageProvider["writeDocument"] = async (workspaceId, doc) => {
    const workspace = selectWorkspace(store, workspaceId);
    workspace.documents.set(doc.id, doc);
  };

  const deleteDocument: StorageProvider["deleteDocument"] = async (workspaceId, docId) => {
    const workspace = selectWorkspace(store, workspaceId);
    workspace.documents.delete(docId);
  };

  const listFolders: StorageProvider["listFolders"] = async (workspaceId) => {
    const workspace = selectWorkspace(store, workspaceId);
    return Array.from(workspace.folders.values());
  };

  const createFolder: StorageProvider["createFolder"] = async (workspaceId, parentId, name) => {
    const workspace = selectWorkspace(store, workspaceId);
    const parent = parentId ? workspace.folders.get(parentId) : undefined;
    const path = derivePath(parent, name);
    const folder: FolderMeta = {
      id: createFolderId(),
      name,
      parentId,
      path,
    };
    workspace.folders.set(folder.id, folder);
    return folder;
  };

  const deleteFolder: StorageProvider["deleteFolder"] = async (workspaceId, folderId) => {
    const workspace = selectWorkspace(store, workspaceId);
    workspace.folders.delete(folderId);
  };

  return {
    listDocuments,
    readDocument,
    writeDocument,
    deleteDocument,
    listFolders,
    createFolder,
    deleteFolder,
  };
};

export { createInMemoryStorageProvider };
