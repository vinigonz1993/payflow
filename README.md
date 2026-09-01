# Payflow

A NestJS-based backend application for managing payment operations with Prisma ORM and PostgreSQL.

## Overview

Payflow is a modern backend service built with NestJS that provides robust payment processing capabilities. It features:

- **NestJS Framework**: Enterprise-grade framework for building scalable server-side applications
- **Prisma ORM**: Type-safe database access with automatic migrations
- **PostgreSQL**: Reliable relational database
- **Comprehensive Testing**: Unit tests, integration tests, and e2e tests with Vitest
- **API Generation**: Automated client and browser SDK generation
- **Code Quality**: Linting with oxlint, formatting with Prettier

## Project Structure

```
backend/
├── src/
│   ├── app.controller.ts      # Main application controller
│   ├── app.service.ts         # Main application service
│   ├── app.module.ts          # Application module
│   ├── main.ts                # Application entry point
│   ├── payments/              # Payment module
│   │   ├── payments.controller.ts
│   │   ├── payments.service.ts
│   │   ├── create-payment.dto.ts
│   │   └── payments.module.ts
│   ├── prisma/                # Prisma service
│   │   └── prisma.service.ts
│   └── generated/             # Auto-generated types and clients
├── test/
│   └── app.e2e-spec.ts        # E2E tests
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Navigate to backend directory
cd backend
npm install
```

## Environment Setup

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/payflow"
```

## Database Setup

```bash
# Run migrations
npm run prisma migrate dev

# Generate Prisma client
npm run prisma generate

# (Optional) Open Prisma Studio
npm run prisma studio
```

## Development

```bash
# Start development server with auto-reload
npm run start:dev

# Start in debug mode
npm run start:debug

# Build the project
npm run build

# Start production build
npm run start:prod
```

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Debug tests
npm run test:debug
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Check migration status
npx prisma migrate status

# Reset database (WARNING: destructive)
npx prisma migrate reset
```

## API Endpoints

### Payments Module

The payments module provides endpoints for payment operations:

- `POST /payments` - Create a new payment
- `GET /payments` - Retrieve all payments
- `GET /payments/:id` - Retrieve a specific payment

See [create-payment.dto.ts](backend/src/payments/create-payment.dto.ts) for request payload details.

## Generated Artifacts

The `generated/` directory contains auto-generated types and client SDKs:

- `client.ts` - Node.js/server-side client
- `browser.ts` - Browser-side client
- `models.ts` - TypeScript data models
- `enums.ts` - Enum definitions
- `commonInputTypes.ts` - Shared input types

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start with watch mode |
| `npm run start:debug` | Start with debugging |
| `npm run start:prod` | Run production build |
| `npm run build` | Build the project |
| `npm run lint` | Run linter |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Generate coverage report |
| `npm run test:e2e` | Run e2e tests |

## Technologies Used

- **Framework**: NestJS 12
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Vitest with Supertest
- **Linting**: Oxlint
- **Formatting**: Prettier
- **TypeScript**: v6
- **Validation**: class-validator, class-transformer

## License

MIT License - See [LICENSE](LICENSE) for details

## Contributing

See project guidelines for development workflow and code standards.
