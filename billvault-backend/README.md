# BillVault Backend

Smart Bill Locker -- Backend API

## Stack

| Layer              | Technology                        |
|--------------------|-----------------------------------|
| Runtime            | Node.js                           |
| Framework          | Express.js                        |
| Database           | PostgreSQL                        |
| Cache / Queue      | Redis + BullMQ                    |
| File Storage       | Cloudflare R2 (S3-compatible)     |
| OCR                | Google Vision API                 |
| Email Import       | Gmail API (OAuth2)                |
| Push Notifications | Firebase Cloud Messaging (FCM)    |
| Real-time          | Socket.IO                         |
| API Docs           | Swagger / OpenAPI 3.0             |
| Containerization   | Docker + Docker Compose           |

## Quick Start

```bash
# 1. Copy env template
cp .env.example .env

# 2. Fill in all values in .env

# 3. Start infrastructure (PostgreSQL + Redis)
docker-compose up -d postgres redis

# 4. Install dependencies
npm install

# 5. Run database migrations
npm run migrate

# 6. Seed default data (system categories, admin user)
npm run seed

# 7. Start development server
npm run dev
```

## Documentation
See [src/docs/](./src/docs/) for full architecture, API, and deployment documentation.

## API Docs (Swagger UI)
Available at `http://localhost:3000/api/docs` after starting the server.