import { appDataDir, join } from "@tauri-apps/api/path";
import { mkdir, readDir, readTextFile, remove, writeTextFile } from "@tauri-apps/plugin-fs";
import type { DirEntry } from "@tauri-apps/plugin-fs";
import type {
  DocumentMeta,
  DocumentModel,
  FolderMeta,
  StorageProvider,
} from "../../core/storage/StorageProvider";

const workspaceRootPath = async (workspaceId: string) =>
  join(await appDataDir(), "workspaces", workspaceId);
const documentsDirPath = async (workspaceId: string) =>
  join(await workspaceRootPath(workspaceId), "documents");
const foldersDirPath = async (workspaceId: string) =>
  join(await workspaceRootPath(workspaceId), "folders");
const documentFilePath = async (workspaceId: string, docId: string) =>
  join(await documentsDirPath(workspaceId), `${docId}.json`);
const folderDirPath = async (workspaceId: string, folderId: string) =>
  join(await foldersDirPath(workspaceId), folderId);
const folderMetaPath = async (workspaceId: string, folderId: string) =>
  join(await folderDirPath(workspaceId, folderId), "meta.json");

const createFolderId = () => Math.random().toString(36).slice(2);
const deriveFolderPath = (parentPath: string | null | undefined, name: string) =>
  parentPath ? `${parentPath}/${name}` : name;

const readDocumentFile = async (path: string): Promise<DocumentModel | null> => {
  try {
    const data = await readTextFile(path);
    return JSON.parse(data) as DocumentModel;
  } catch {
    return null;
  }
};

const readFolderMetaFile = async (path: string): Promise<FolderMeta | null> => {
  try {
    const data = await readTextFile(path);
    return JSON.parse(data) as FolderMeta;
  } catch {
    return null;
  }
};

const readFolderMetaById = async (workspaceId: string, folderId: string) =>
  readFolderMetaFile(await folderMetaPath(workspaceId, folderId));

class LocalFsStorageProvider implements StorageProvider {
  async listDocuments(workspaceId: string): Promise<ReadonlyArray<DocumentMeta>> {
    const dir = await documentsDirPath(workspaceId);
    const entries = await readDir(dir).catch(() => []);
    const docs = await Promise.all(
      entries
        .filter((entry: DirEntry) => entry.isFile)
        .map(async ({ name }: DirEntry) => readDocumentFile(await join(dir, name)))
    );
    return docs
      .filter((doc): doc is DocumentModel => doc !== null)
      .map(({ id, title, path, updatedAt }: DocumentModel) => ({ id, title, path, updatedAt }));
  }

  async readDocument(workspaceId: string, docId: string): Promise<DocumentModel | null> {
    const path = await documentFilePath(workspaceId, docId);
    return readDocumentFile(path);
  }

  async writeDocument(workspaceId: string, doc: DocumentModel): Promise<void> {
    const dir = await documentsDirPath(workspaceId);
    await mkdir(dir, { recursive: true });
    const path = await documentFilePath(workspaceId, doc.id);
    await writeTextFile(path, JSON.stringify(doc));
  }

  async deleteDocument(workspaceId: string, docId: string): Promise<void> {
    const path = await documentFilePath(workspaceId, docId);
    await remove(path).catch(() => undefined);
  }

  async listFolders(workspaceId: string): Promise<ReadonlyArray<FolderMeta>> {
    const dir = await foldersDirPath(workspaceId);
    const entries = await readDir(dir).catch(() => []);
    const metas = await Promise.all(
      entries
        .filter((entry: DirEntry) => entry.isDirectory)
        .map(async ({ name }: DirEntry) => readFolderMetaFile(await join(dir, name, "meta.json")))
    );
    return metas.filter((meta): meta is FolderMeta => meta !== null);
  }

  async createFolder(
    workspaceId: string,
    parentId: string | null,
    name: string
  ): Promise<FolderMeta> {
    const id = createFolderId();
    const parent = parentId ? await readFolderMetaById(workspaceId, parentId) : null;
    const path = deriveFolderPath(parent?.path, name);
    const folder: FolderMeta = { id, name, parentId, path };
    const dir = await folderDirPath(workspaceId, id);
    await mkdir(dir, { recursive: true });
    await writeTextFile(await folderMetaPath(workspaceId, id), JSON.stringify(folder));
    return folder;
  }

  async deleteFolder(workspaceId: string, folderId: string): Promise<void> {
    const dir = await folderDirPath(workspaceId, folderId);
    await remove(dir, { recursive: true }).catch(() => undefined);
  }
}

export { LocalFsStorageProvider };
