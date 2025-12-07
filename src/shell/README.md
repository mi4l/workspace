# Shell layer

Purpose

- Hosts adapters for JS-level shell integrations (e.g., Tauri commands, CLI bridges).
- Provides boundary modules that core or infra can call without directly invoking platform APIs.

Guidelines

- Keep shell interactions isolated; expose small, testable functions to upstream layers.
- Avoid embedding business logic; delegate to core services where possible.
