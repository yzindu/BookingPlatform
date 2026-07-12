# Booking Platform API

A REST API built with **NestJS** and **TypeScript** for managing services and customer bookings — built as the technical assessment for the EN2H Software Engineer Intern (NestJS) role.

## Project Overview

The API supports:
- JWT-based authentication (register/login)
- Authenticated CRUD for **Services**
- Public booking management (create, list, view, update status, cancel)
- Business rule enforcement (see below)
- Interactive API documentation via Swagger

## Tech Stack

- **Framework:** NestJS + TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech)), via TypeORM
- **Auth:** JWT (Passport)
- **Validation:** class-validator / class-transformer
- **Docs:** Swagger (`@nestjs/swagger`)

## Folder Structure

```
src/
├── auth/              # register / login controllers & services
├── bookings/          # booking CRUD, validation rules, enums, dtos
├── services/          # service CRUD, services, dtos, entities
├── main.ts            # entry point
└── app.module.ts      # root module
```

## Installation Steps

1. Clone the repository:
```bash
   git clone 
   cd booking-platform
```
2. Install dependencies:
```bash
   npm install
```
3. Copy the example environment file and fill in your own values:
```bash
   cp .env.example .env
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# Postgres
DB_HOST=[IP_ADDRESS]
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_NAME=booking_platform
```

Generate a random JWT_SECRET with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```


## Author

Yasindu — BSc (Hons) Computer Science, Informatics Institute of Technology (IIT)

