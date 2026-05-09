````markdown
# Software Engineering Standards & Guidelines

This document defines the **mandatory software engineering standards, architecture rules, tooling, and coding
conventions** for all software projects developed within this department. Compliance is required for all repositories,
contributors, and environments.

---

## 0. Repository Usage Instructions (Template Project)

This repository is an **official project template** for building applications using **Next.js + TypeScript + Tailwind
CSS**, aligned with Clean Architecture and Domain-Driven Design (DDD).

The template includes:

- Preconfigured dependencies
- Base architecture and folder structure
- Formatting, linting, and tooling aligned with these standards

This repository **must be used as the starting point** for all new frontend or full-stack projects unless an explicit
exception is approved.

### Prerequisites

Before using this repository, ensure the following are installed locally:

- **Node.js** (LTS version only)
- **pnpm** (mandatory)
- **Git**

> The use of `npm`, `yarn`, `bun`, or any other package manager is **strictly prohibited**.

### Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-name>
````

2. **Install dependencies**

```bash
pnpm install
```

All required dependencies are already defined. Do not add new dependencies without justification.

3. **Environment Variables**

If environment variables are required, create a `.env.local` file based on `.env.example` (if present):

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

### Project Usage Rules

* This template **must not be structurally modified** in a way that violates this document.
* All new features must follow **Clean Architecture**, **DDD principles**, and all naming conventions defined below.
* Formatting, linting, testing, and commit rules are **not optional**.

***

## 1. Core Technology Stack

* **Framework:** Next.js
* **Language:** TypeScript (`strict: true`)
* **Styling:** Tailwind CSS
* **Database:** MongoDB
* **ODM:** Mongoose
* **Package Manager:** pnpm
* **Formatter:** Prettier
* **Linter:** ESLint
* **Testing:** Vitest
* **IDE:** WebStorm (JetBrains)

***

## 2. Universal Language Rule

* **100% English only**
* Applies to:
    * Source code
    * Identifiers
    * Folder and file names
    * Database collections and fields
    * Branch names
    * Commit messages
    * Pull requests

No exceptions.

**No spaces or special characters** are allowed in identifiers, branch names, or filenames.

***

## 3. Naming Conventions

### Directories

* Always use `kebab-case`
* ✅ `user-profile`
* ❌ `UserProfile`, `userProfile`, `user_profile`

### Files

* **React Components:** `PascalCase.tsx`
    * Example: `DashboardMetrics.tsx`
* **Standard TypeScript files:** `kebab-case.ts`
    * Example: `user-repository.ts`

### Code Elements

* **Variables & Functions:** `camelCase`
    * `fetchUserData`, `isActive`
* **Classes & Interfaces:** `PascalCase`
    * `UserEntity`, `IUserRepository`
* **Constants:** `UPPER_SNAKE_CASE`
    * `MAX_RETRY_ATTEMPTS`

***

## 4. Architecture: Clean Architecture & DDD

All projects must follow **Object-Oriented Programming (OOP)**, **Domain-Driven Design (DDD)**, and **Clean Architecture
** principles.

### Layer Responsibilities

1. **Domain Layer**
    * Core business entities and rules
    * No external dependencies
    * No framework imports

2. **Application Layer**
    * Use cases
    * Application-specific business logic
    * Depends only on the Domain layer

3. **Infrastructure Layer**
    * Database implementations (Mongoose)
    * External services (APIs, queues, providers)
    * Implements interfaces defined in Domain/Application

4. **Presentation Layer**
    * Next.js pages, components, API routes
    * Handles HTTP, UI, and user interaction
    * Must never contain business logic

### Dependency Rule

Dependencies **must always point inward**:

    Presentation → Application → Domain

Infrastructure **depends on** Domain/Application, never the opposite.

### Example

```ts
export interface IUserRepository {
    findById(id: string): Promise<UserEntity | null>;

    save(user: UserEntity): Promise<void>;
}

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async execute(userData: UserDTO): Promise<void> {
        const user = new UserEntity(userData);
        await this.userRepository.save(user);
    }
}
```

***

## 5. Next.js-Specific Architecture Rules

* **API routes** belong to the Presentation layer

* API routes:
    * Must only orchestrate requests
    * Must call Application-layer use cases
    * Must never access the database directly

* **UI components**:
    * Must be presentational
    * Must not contain business logic

* **Use cases** must never import:
    * Next.js
    * React
    * Browser APIs

***

## 6. Database Standards (MongoDB & Mongoose)

### Database Naming

Format:

    [project-name]-[environment]

Examples:

* `manufacturing-metrics-dev`
* `inventory-system-prod`

### Collection Naming

* Lowercase
* Plural English nouns
* No separators

Examples:

* `users`
* `sensorreadings`
* `vehicles`

### Data Access Rules

* **Raw MongoDB queries are strictly prohibited**
* All data access must:
    * Use Mongoose schemas and models
    * Be encapsulated inside Repository classes
    * Reside in the Infrastructure layer

***

## 7. Testing Standards

Testing is **mandatory** for all projects.

All testing across projects must use **Vitest** as the standard testing framework.

* **Domain & Application Layers**
    * Unit tests are **mandatory** for all use cases
    * Tests must focus on business rules and application logic
    * Frameworks, UI, and infrastructure concerns must be mocked or replaced with fakes

* **Infrastructure Layer**
    * Integration tests are **allowed and encouraged**
    * Tests may use real implementations (e.g., database connections, external services) when required
    * Vitest must still be used as the test runner and assertion framework

* **Presentation Layer**
    * UI and API behavior tests should be implemented when applicable
    * Tests must validate observable behavior, not internal implementation details
    * Vitest is required for all frontend and API route testing

### Coverage Requirements

* Minimum test coverage: **80%**
* Coverage must be generated using **Vitest coverage tooling**
* CI pipelines will **fail automatically** if coverage thresholds are not met

## 8. Formatting & Linting

### Prettier

* All code must be formatted using **Prettier**
* A `.prettierrc` file is mandatory
* WebStorm must be configured to format on save

### ESLint

* ESLint is mandatory
* Strict TypeScript rules must be enabled
* CI pipelines will reject linting errors

***

## 9. Version Control (GitHub)

### Branching Strategy

* `main` – Production-ready code (**protected**)
* `staging` – Integration/testing code (**protected**)
* `feature/[feature-name]`
    * Example: `feature/user-authentication`
* `fix/[bug-name]`
    * Example: `fix/login-crash`

### Pull Requests

* Direct pushes to `main` or `staging` are strictly disabled
* All changes must go through Pull Requests
* Code review is mandatory for all Pull Requests

* Each Pull Request must represent **a single, well-defined objective**
* Pull Requests should be **small, focused, and easily reviewable**
* Mixing features, refactors, and formatting changes in the same Pull Request is not allowed

* Large Pull Requests must be justified and may be rejected if they can be reasonably split
* Reviewers are explicitly allowed to request Pull Request splitting before approval

* A Pull Request **cannot be merged** unless:
    * All required reviewers have approved it
    * All CI checks have passed successfully
    * Coverage and quality gates are met

* Ownership rules (e.g. CODEOWNERS) must be respected when applicable

### Commit Messages

All commits must follow **semantic commit conventions**:

* `feature: add user registration`
* `fix: resolve dashboard rendering issue`
* `refactor: update user repository interface`
* `chore: update dependencies`

Commit messages must be written in English, clearly describe the change, and avoid mixing multiple logical changes in a
single commit.


***

## 10. Package Management

* **pnpm is mandatory**
* The following are strictly prohibited:
    * npm
    * yarn
    * bun

A `pnpm-lock.yaml` file must always be committed.

***

## 11. Development Environment (IDE)

The **only approved IDE** is **WebStorm by JetBrains**.
This IDE is available on Ford App Store (MacOS) or Software Store (Windows)

### Why WebStorm?

* **Standardization:** Eliminates extension drift and environment inconsistency
* **Advanced Refactoring:** Industry-leading TypeScript analysis
* **Built-in Tooling:** Native integration with Git, pnpm, Prettier, ESLint, and Docker

Use of other editors is **not supported**.

***

## 12. Enforcement

* CI/CD pipelines enforce formatting, linting, and testing rules
* Non-compliant Pull Requests will be rejected
* Repeated violations may block repository access

```

