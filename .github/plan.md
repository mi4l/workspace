Work Items (GitHub Issue-Friendly)

Below is a structured, ordered list including future-proofing steps.

⸻

Epic 1 — Foundation and Tooling 1. Initialize repo with README, license, basic architecture summary. 2. Set up Tauri + React + TypeScript skeleton. 3. Add linting, formatter, and CI pipeline. 4. Create project structure (core, ui, infra, shell).

⸻

Epic 2 — Core Abstractions and Storage Provider Interface 5. Define StorageProvider interface in core/storage. 6. Implement LocalFsStorageProvider using Tauri IPC commands. 7. Update WorkspaceService and DocumentService to depend on StorageProvider. 8. Write ARCHITECTURE.md explaining provider model for future cloud support.

⸻

Epic 3 — Shell Layer (Rust) Implementation 9. Implement Tauri commands:
• read_file
• write_file
• list_dir
• select_directory_dialog 10. Implement file path utilities. 11. Optional: implement local SQLite setup for search index.

⸻

Epic 4 — Application Core 12. Implement WorkspaceService (provider-backed). 13. Implement DocumentService (provider-backed). 14. Implement SearchService using local SQLite (or in-memory first). 15. Implement AppController and React context provider.

⸻

Epic 5 — UI Shell 16. Create AppRoot layout (sidebar + header + editor pane). 17. Implement Sidebar with file tree bound to WorkspaceService. 18. Implement placeholder EditorView. 19. Implement search bar and results pane. 20. Add workspace selection dialog and loading flow.

⸻

Epic 6 — Editor Integration 21. Integrate TipTap (or chosen engine) with base blocks. 22. Implement EditorView with load/save hooks. 23. Add autosave with debounce. 24. Add toolbar or slash menu for block insertion.

⸻

Epic 7 — Rich Blocks & Media 25. Add core blocks: headings, lists, code blocks, callouts, tables, images. 26. Implement insert/transform commands. 27. Add image insertion using Tauri file dialog.

⸻

Epic 8 — Export 28. Implement HTML renderer in ExportService. 29. Implement DOCX renderer. 30. Add export UI and integrate with storage adapter for writing files.

⸻

Epic 9 — Future-Proofing Cloud Hooks (can be done now or later) 31. Document CloudStorageProvider API shape (no implementation yet). 32. Write stub CloudStorageProvider that throws “not implemented”. 33. Document expected backend routes and payload formats. 34. Add SyncEngine interface and stub implementation.

These ensure no architectural dead ends.

⸻

Epic 10 — Polish & Release 35. Add settings panel (theme, font size, autosave timing). 36. Add recents list and quick switcher. 37. Add error overlays and fallback behaviors. 38. Create installers for macOS/Windows/Linux. 39. Finalize docs for team onboarding.
