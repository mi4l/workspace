# Storage contracts

Purpose

- Defines storage-related interfaces owned by the core layer.
- Keeps persistence concerns abstract so infra implementations can swap without touching UI.

Guidelines

- Keep contracts minimal and focused on app needs.
- Avoid embedding persistence strategy details or platform-specific types.
