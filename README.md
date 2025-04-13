# NestJS CRUD Microservices

A modular microservices-based CRUD system built using **NestJS**, **PostgreSQL**, and **Docker**.

## 🧱 Architecture

This project demonstrates  microservices setup with an API Gateway, User Service, and Product Service:

```bash
nestjs-crud-microservices/
.
├── api-gateway
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── auth
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── jwt-strategy.ts
│   │   ├── config
│   │   │   └── database.config.ts
│   │   ├── main.ts
│   │   ├── product
│   │   │   └── product.controller.ts
│   │   └── user
│   │       ├── user.controller.ts
│   │       └── user.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── docker-compose.yml
├── env.example
├── product-service
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── config
│   │   │   └── database.config.ts
│   │   ├── database
│   │   │   └── database.module.ts
│   │   ├── dto
│   │   │   └── product.dto.ts
│   │   ├── main.ts
│   │   ├── models
│   │   │   ├── index.ts
│   │   │   └── products.ts
│   │   └── product
│   │       ├── product.controller.spec.ts
│   │       ├── product.controller.ts
│   │       ├── product.module.ts
│   │       └── product.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── README.md
└── user-service
    ├── Dockerfile
    ├── eslint.config.mjs
    ├── nest-cli.json
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── src
    │   ├── app.controller.spec.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── config
    │   │   └── database.config.ts
    │   ├── database
    │   │   └── database.module.ts
    │   ├── dto
    │   │   └── users.dto.ts
    │   ├── main.ts
    │   ├── models
    │   │   ├── index.ts
    │   │   └── users.ts
    │   └── user
    │       ├── user.controller.spec.ts
    │       ├── user.controller.ts
    │       ├── user.module.ts
    │       └── user.service.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    └── tsconfig.json
           

## 🚀 Features

- Modular NestJS microservices
- PostgreSQL integration per service
- REST API Gateway
- Dockerized for easy setup
- Jest-based unit, integration, and E2E testing

---

## ⚙️ Services Overview

### 🧑 User Service
- `POST /users` – Create a user
- `GET /users/:id` – Get user by ID
- `PATCH /users/:id` – Update user
- `DELETE /users/:id` – Delete user

### 📦 Product Service
- `POST /products` – Add a product
- `GET /products` – List products
- `PATCH /products/:id/stock` – Update product stock
- `DELETE /products/:id` – Delete product

### 🌐 API Gateway
- Routes requests to the respective microservice using internal HTTP

---

## 🐳 Dockerized Setup

### 📄 Dockerfile
Each service has a `Dockerfile` using Node 18 Alpine:
```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN 
EXPOSE <PORT>
CMD 
```

### 📄 docker-compose.yml
Orchestrates:
- PostgreSQL DB
- User Service
- Product Service
- API Gateway

### 🔧 Usage

#### Clone and Run:
```bash
git clone https://github.com/PRASHANTGANGWAR/nestjs-crud-microservices
cp .env.example .env
docker-compose up -d
```

#### Stop:
```bash
docker-compose down
```

---

## 🔍 Environment Variables

Each service uses `.env` for database configuration:

```env
# Example (user-service/.env)
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
INTERNAL_API_KEY=
```

---

## ✅ Testing

Each service supports unit and integration tests using **Jest**.

Run tests:
```bash
# From inside the service folder
npm test

 ### To Clear Jest Cache
    ```bash
    npx jest --clearCache
    ```

```
---
