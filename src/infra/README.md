# Infrastructure layer

Purpose

- Hosts adapters that satisfy core contracts while hiding platform or library specifics.
- Handles persistence, IPC, and other integration details.

Guidelines

- Keep implementations small and composable; prefer pure helpers around effectful boundaries.
- Depend on core contracts instead of leaking infra concerns upward.
- Swap implementations via factories (e.g., createInMemoryStorageProvider).
