# Architecture Overview

This project is a local-first, Confluence-style document workspace built with a Tauri (Rust) shell and a React + TypeScript UI. The system is divided into four layers that separate concerns and keep the path open for future cloud storage via a `StorageProvider` abstraction.

## Stack at a Glance
- Shell: Tauri (Rust) for window lifecycle, secure IPC, file system access, and native integrations.
- UI: React + TypeScript with TipTap for structured rich-text editing.
- Application Core: `AppController` plus domain services that orchestrate workflows and policies.
- Infrastructure: `StorageProvider` interface with adapters (local filesystem first; cloud-ready later).

## Layered Model
- Shell (Tauri Rust core): Hosts the desktop window, exposes safe native capabilities (filesystem, dialogs), and brokers UI ↔ core calls over IPC. Enforces sandboxing and guards privileged operations.
- UI (React + TipTap): Renders navigation, editor, search, and export flows. Shares TypeScript types with the core to keep data shapes consistent and minimize IPC mismatches.
- Application Core (AppController + services): Coordinates document lifecycle (open, edit, autosave, search, export). Encodes business rules such as autosave cadence and conflict handling. Calls into `StorageProvider` without knowing the backing store.
- Infrastructure (StorageProvider + adapters): Defines the storage contract (workspace discovery, CRUD, search hooks, export). Implements a local filesystem adapter first; additional adapters (S3, Supabase, Drive, etc.) can be added without changing UI or core logic.

## StorageProvider Abstraction
`StorageProvider` is the boundary between the Application Core and persistence. It:
- Exposes operations to list/open workspaces, load/save documents, update metadata, run search queries, and export snapshots.
- Hides storage specifics: file paths, credentials, remote APIs, and sync protocols.
- Enables future cloud backends by swapping adapters while preserving method signatures and data contracts, keeping UI and core untouched.

## High-Level Data Flow
1) Open workspace: UI requests available workspaces; Shell mediates filesystem access; Application Core selects workspace via `StorageProvider`.
2) Edit documents: UI (TipTap) emits structured changes; Application Core applies them to the document model and schedules autosave.
3) Save: Application Core invokes `StorageProvider.saveDocument`; Shell performs native writes; a cloud adapter could also enqueue sync.
4) Search: UI issues a query; Application Core calls `StorageProvider.search`; provider consults a local index or remote service depending on the adapter.
5) Export: UI triggers export; Application Core prepares a snapshot; `StorageProvider.export` writes to disk or streams to a remote target through the adapter.

## Implied Repository Layout
- `src-tauri/` – Rust shell, IPC commands, and native capability wrappers.
- `src/` – React UI, TipTap editor, routing, and UI state.
- `src/core/` – AppController, document/domain models, services, autosave/conflict policies.
- `src/infrastructure/` – `StorageProvider` definition; `filesystem` adapter; future `cloud/*` adapters.
- `docs/` – Architecture notes, issues, and work items for project planning.
