# FinanceFlow - Personal Finance Backend

FinanceFlow is a RESTful API developed with NestJS for personal finance management, allowing users to record and analyze their income, expenses, and savings goals.

[![Built with NestJS](https://img.shields.io/badge/built%20with-NestJS-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8%2B-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-lightgrey.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-blue.svg)](https://www.postgresql.org/)
[![Documentation with Swagger](https://img.shields.io/badge/documentation-Swagger-green.svg)](https://swagger.io/)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Running the App](#-running-the-app)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Software Quality (ISO/IEC 25010)](#-software-quality-isoiec-25010)
- [License](#-license)
- [📚 Documentación Técnica](#-documentación-técnica)

## ✨ Features

- **User Management**: Registration, authentication, and profile administration.
- **Income Management**: Recording and categorizing income sources.
- **Expense Management**: Recording and categorizing expenses.
- **Savings Goals**: Definition and tracking of financial goals.
- **Financial Analysis**: Balance calculations and category-based reports.
- **RESTful API**: Endpoints documented with Swagger.
- **JWT Authentication**: Route protection using JWT tokens.
- **Relational Database**: Normalized data model using PostgreSQL.

## 🏗 Architecture

FinanceFlow follows a modular architecture based on the MVC (Model-View-Controller) pattern adapted for APIs:

1. **Presentation Layer**: NestJS controllers that define REST endpoints.
2. **Business Layer**: Services that implement business logic.
3. **Data Layer**: Data access through Prisma ORM.

### Architecture Diagram

```
📦 FinanceFlow
┣━━ API Layer (Controllers)
┃   ┗━━ HTTP Requests/Responses
┣━━ Business Logic Layer (Services)
┃   ┗━━ Application Logic
┣━━ Data Access Layer (Prisma)
┃   ┗━━ Database Operations
┗━━ PostgreSQL Database
```

### Data Flow

1. Clients send HTTP requests to controllers.
2. Controllers validate input data and call services.
3. Services implement business logic and use Prisma to interact with the database.
4. Prisma executes operations on the PostgreSQL database.
5. Results travel back through the layers to the client.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker and Docker Compose (for development and testing environments)
- PostgreSQL (v14 or higher, if not using Docker)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/financeflow-backend.git
cd financeflow-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with the necessary configurations
```

4. Generate Prisma Client:

```bash
npm run prisma:generate
```

## ⚙ Environment Configuration

The project is configured to work in three environments:

### Production

Uses the `.env` file in the project root. Configure your production database:

```
DATABASE_URL="postgresql://username:password@production-host:5432/financeflow?schema=public"
JWT_SECRET=secure_production_secret
JWT_EXPIRES_IN=1d
PORT=3004
```

### Development

Uses the `.env.development` file. For local development, you can use Docker:

```bash
# Start the development database
docker-compose up -d

# Apply migrations and load initial data
npm run db:dev:deploy
```

Configuration in `.env.development`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5409/finance-db?schema=public"
JWT_SECRET=development_secret
JWT_EXPIRES_IN=1d
PORT=3004
```

### Testing

Uses the `.env.test` file. For automated tests:

```bash
# Start the test database
docker-compose -f docker-compose.test.yml up -d

# Apply migrations and load initial data for tests
npm run db:test:deploy
```

Configuration in `.env.test`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5410/finance-test-db?schema=public"
JWT_SECRET=testing_secret
JWT_EXPIRES_IN=1d
PORT=3004
```

## 🚀 Running the App

### Development

```bash
# Development mode with auto-reload
npm run start:dev
```

### Testing

```bash
# Testing mode
npm run start:test
```

### Production

```bash
# Build for production
npm run build

# Run in production
npm run start:prod
```

## 🧪 Testing

The project includes unit and integration tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

The current test coverage is over 95%, meeting established quality standards.

## 📄 API Documentation

API documentation is available through Swagger UI:

```
http://localhost:3004/api/docs
```

This documentation details all endpoints, data models, required parameters, and expected responses.

## 📁 Project Structure

```
📦 financeflow-backend
 ┣ 📂 src
 ┃ ┣ 📂 auth            # Authentication and authorization
 ┃ ┣ 📂 expenses        # Expense management
 ┃ ┣ 📂 expense-type    # Expense types
 ┃ ┣ 📂 incomes         # Income management
 ┃ ┣ 📂 income-type     # Income types
 ┃ ┣ 📂 prisma          # Prisma ORM configuration
 ┃ ┣ 📂 savings-goals   # Savings goals
 ┃ ┣ 📂 shared          # Shared utilities
 ┃ ┣ 📂 total           # Financial calculations
 ┃ ┣ 📂 users           # User management
 ┃ ┣ 📜 app.module.ts   # Main application module
 ┃ ┗ 📜 main.ts         # Application entry point
 ┣ 📂 test              # e2e tests
 ┣ 📂 prisma            # Database schema and migrations
 ┃ ┣ 📂 migrations      # Migrations generated by Prisma
 ┃ ┣ 📂 seeds           # Initial data scripts
 ┃ ┗ 📜 schema.prisma   # Database schema
 ┣ 📜 .env.example      # Example environment variables
 ┣ 📜 docker-compose.yml      # Docker configuration for development
 ┣ 📜 docker-compose.test.yml # Docker configuration for testing
 ┗ 📜 package.json      # Dependencies and scripts
```

## 🔍 Software Quality (ISO/IEC 25010)

This project implements practices to comply with the ISO/IEC 25010 quality standards:

### Functional Suitability

- ✅ Unit and integration tests to verify expected behavior
- ✅ Code coverage greater than 95%

### Performance Efficiency

- ✅ Query optimization through Prisma ORM
- ✅ Normalized data models for efficiency

### Compatibility

- ✅ Documented RESTful API to facilitate integration
- ✅ Support for different clients through CORS

### Usability

- ✅ Clear documentation with Swagger
- ✅ Descriptive error messages

### Reliability

- ✅ Robust error handling
- ✅ Input data validation

### Security

- ✅ Authentication through JWT
- ✅ Route protection
- ✅ Data validation in DTOs

### Maintainability

- ✅ Modular and well-organized code
- ✅ Documentation through JSDoc comments
- ✅ Logical directory structure

### Portability

- ✅ Configurations for different environments
- ✅ Containerization with Docker

## 📝 License

[MIT](LICENSE)

## 📚 Technical Documentation
This project uses [Compodoc](https://compodoc.app/) to generate detailed technical documentation.

### Generating Documentation
1. Install Compodoc globally:
```bash
npm install -g @compodoc/compodoc
```
2. Generate the documentation:
```bash
npm run docs:generate
```
3. Serve the documentation locally:
```bash
npm run docs:serve
```
The documentation will be available at `http://localhost:8080`

### Documentation Content
- Project architecture
- Module and dependency diagrams
- Controllers and services documentation
- Documentation coverage
- Routes and endpoints
- Interfaces and DTOs
