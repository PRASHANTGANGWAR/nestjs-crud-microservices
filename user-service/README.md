# 🧑‍💻 User Service - NestJS CRUD Microservices

This service is responsible for handling **User CRUD operations** 
---

## 📁 Project Structure

```
user-service/
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
```

---

## 🚀 Features

- Create User
- Get User by ID
- Update User by ID
- Delete User by ID
- PostgreSQL integration using TypeORM
- Jest-based unit, integration, and E2E testing

---

## 📦 Endpoints

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| POST   | `/users`      | Create new user     |
| GET    | `/users/:id`  | Get user by ID      |
| PATCH  | `/users/:id`  | Update user by ID   |
| DELETE | `/users/:id`  | Delete user by ID   |

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

`docker-compose.yml` file in the root of the project includes the `user-service` setup.

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
