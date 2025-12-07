
When adding new code
	•	Prefer TypeScript for UI and Core layers.
	•	Prefer Rust for Tauri commands.
	•	Avoid premature abstraction or feature addition.

⸻

4. Safety and Reliability Requirements

AI-generated contributions must:
	•	Avoid destructive operations (e.g., deleting unrelated files).
	•	Preserve existing comments, documentation, and metadata unless instructed.
	•	Avoid introducing external network calls or dependencies that break offline mode.
	•	Prefer simple, readable implementations over clever or complex solutions.

⸻

5. Coordination With Human Developers

AI agents must:
	•	Ask for clarification when requirements are ambiguous.
	•	Offer multiple approaches when complexity is high.
	•	Default to minimal change sets when iterating.
	•	Document assumptions made during generation.

Humans remain the source of truth for architectural decisions.

⸻

6. Planned Future Agents

This repository may eventually include:
	•	A Sync Agent for cloud integration tasks
	•	A Testing Agent for automated QA expansion
	•	A Refactor Agent for large-scale code cleanup

These agents will be defined in separate documents and must not be created automatically.

⸻

7. Versioning of Instructions

Developers may update this file over time.
Agents must always follow the latest version.

⸻

8. Functional Programming Style Guidelines

The agent should apply practical functional programming principles throughout the codebase. The intention is to improve clarity, composability, predictability, and testability without introducing unnecessary category-theoretic abstractions.

The agent must prefer:

Expressions over statements
	•	Favor expression-based code.
	•	Minimize imperative control flow when a functional expression is clearer.

Point-free style where appropriate
	•	Prefer point-free definitions when they improve readability.
	•	Avoid point-free transformations that obscure intent.

Unary function orientation
	•	Prefer unary functions (single-argument) as building blocks.
	•	Use currying or partial application to derive multi-argument behavior.

Separation of effectful and effectless code
	•	Pure, deterministic logic should remain effectless.
	•	File I/O, IPC, network calls, and mutation should be isolated and clearly named.
	•	Effects should be contained at module boundaries and never leak unintentionally.

Composition
	•	Prefer functional composition over nested calls or procedural sequencing.
	•	A generic compose or pipe utility may be used where it improves clarity.
	•	Compose small functions instead of writing large, multi-purpose ones.

Currying and partial application
	•	Use currying for clarity, reuse, and pipeline integration.
	•	Avoid currying when it decreases readability or forces unnatural patterns.

Avoid unnecessary FP abstraction
	•	Do not introduce monads, functors, monoids, or algebraic structures unless explicitly asked.
	•	Keep the FP layer practical and accessible to the team.

The goal is:
simple, readable, functional code that emphasizes composability and purity without overengineering.