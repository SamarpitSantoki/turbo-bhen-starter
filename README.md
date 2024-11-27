# BHEN StarterKit

This is a monorepo built with Turborepo that provides a robust foundation for full-stack applications.

## Project Structure

This monorepo includes the following packages and apps:

### Apps

- `web`: A Next.js web application
- `mobile-app`: A cross-platform mobile application
- `backend`: A backend server application

### Packages

- `@repo/ui`: A shared React component library used across web and mobile applications
- `@repo/core`: Core business logic and shared utilities
- `@repo/typescript-config`: Shared TypeScript configurations
- `@repo/eslint-config`: Shared ESLint configurations

## Tech Stack

- [Turborepo](https://turbo.build/repo) for monorepo management
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Bun](https://bun.sh/) as the package manager
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting Started

### Prerequisites

- Node.js >= 18
- Bun >= 1.1.27

### Installation

```sh
# Clone the repository
git clone [repository-url]

# Install dependencies
bun install
```

### Development

To develop all apps and packages:

```sh
bun run dev
```

### Build

To build all apps and packages:

```sh
bun run build
```

### UI Development

To work on the UI components:

```sh
bun run ui
```

## Project Scripts

- `bun run dev`: Start development mode
- `bun run build`: Build all applications
- `bun run lint`: Lint all code
- `bun run ui`: Start UI development environment

## Remote Caching

This project supports Turborepo's Remote Caching feature. To enable it:

1. Create a [Vercel account](https://vercel.com/signup)
2. Login to Turborepo CLI:
   ```sh
   npx turbo login
   ```
3. Link your project to Remote Cache:
   ```sh
   npx turbo link
   ```

## Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Bun Documentation](https://bun.sh/docs)
