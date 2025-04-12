# 🧑‍💻 Product Service - NestJS CRUD Microservices

This service is responsible for handling **Product CRUD operations** 
---

## 📁 Project Structure

```
 product-service
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
```

---

## 🚀 Features

- Add new product
- List all products
- Update product stock by ID
- Delete product by ID
- PostgreSQL integration using TypeORM
- Jest-based unit, integration, and E2E testing

---

## 📦 Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/products`            | Add a new product        |
| GET    | `/products`            | List all products        |
| PATCH  | `/products/:id/stock`  | Update product stock     |
| DELETE | `/products/:id`        | Delete product by ID     |

---


## ⚙️ Setup

```bash
npm install
cp .env.example .env
npm run start:dev
```


## 🧪 Testing

### Unit Tests
```bash
npm test
```
      ### To Clear Jest Cache
    ```bash
    npx jest --clearCache
    ```

### E2E Tests
```bash
npm run test:e2e
```

---

## 🛠️ Technologies Used

- [NestJS](https://nestjs.com/) - Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Jest](https://jestjs.io/) - Testing framework

---

## 🐳 Docker

`docker-compose.yml` file in the root of the project includes the `product-service` setup.

---

## 🔧 Environment Variables

Create a `.env` file with the following:
```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
PORT=
```
---

