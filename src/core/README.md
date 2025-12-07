# Core layer

Purpose

- Encapsulates application logic, domain models, and orchestration.
- Owns contracts (e.g., StorageProvider) that infra adapters implement.

Guidelines

- Keep functions pure where possible; isolate effects at the edges.
- Accept dependencies (infra or shell adapters) as parameters to keep the core testable.
- Avoid UI concerns and framework-specific code in this layer.
