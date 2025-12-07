# UI layer

Purpose

- Houses React components, layouts, and editor integration points.
- Coordinates user interactions by calling into the core layer only.

Guidelines

- Keep components functional and composable; avoid coupling to infra or shell APIs.
- Route side effects through core services instead of triggering them directly.
- Prefer presentational components that receive data via props from container logic.
