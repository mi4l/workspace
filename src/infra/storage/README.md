# Storage adapters

Purpose

- Implements the storage contracts defined in core (e.g., StorageProvider).
- Bridges to specific persistence mechanisms such as memory, filesystem, or database.

Guidelines

- Keep adapters small; prefer factories that return objects satisfying core contracts.
- Avoid importing UI concerns; expose simple, data-oriented APIs.
