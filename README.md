# Local-First Rich Document Workspace

A Tauri + React + TypeScript desktop app that delivers a Confluence-style editing experience with local-first speed, privacy, and reliability, while keeping a clean path to cloud synchronization later.

## Core Features
- Rich text editing with block and inline formatting (TipTap-based).
- Workspace organization for pages, sections, navigation, and search.
- Offline-by-default persistence with fast local saves.
- Export-friendly workflows for sharing or backup.
- Extensible storage via a `StorageProvider` abstraction to add cloud backends without rewriting the app.

## Local-First Philosophy
- Reads and writes stay on-device first for performance, privacy, and resilience.
- Users remain productive offline; sync is additive, not required.
- The same APIs serve both local and future cloud-backed flows to avoid vendor lock-in.

## Planned Cloud Extensibility
- `StorageProvider` defines CRUD, search indexing hooks, and export operations as a stable contract.
- The first adapter targets the local filesystem; future adapters can point to S3, databases, or SaaS APIs.
- Cloud support will be additive—UI and Application Core stay unchanged when swapping providers.

## Getting Started
- Tooling: Tauri 2.x toolchain with pnpm-first workflow (v10); npm/yarn are not used and `package-lock.json` is ignored.
- Install dependencies: `pnpm install`
- Run the desktop app in dev (opens Tauri window): `pnpm tauri:dev`
- Build the desktop app: `pnpm tauri:build`
- Preview the web UI only: `pnpm dev` (opens the Vite dev server)

## Project Structure (indicative)
- `src-tauri/` – Tauri shell (Rust) for window lifecycle, secure IPC, and native capabilities.
- `src/` – React UI and TipTap editor.
- `src/core/` – AppController, domain models, and services.
- `src/infrastructure/` – `StorageProvider` interface plus filesystem and future cloud adapters.
- `docs/` – Architecture, decision records, and work items.

## Architecture
See `ARCHITECTURE.md` for the layered design and data flow.

## License
MIT License. See `LICENSE` for details.
