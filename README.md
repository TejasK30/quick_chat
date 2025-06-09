# QuickChat

QuickChat is a modern full-stack chat application that enables users to create instant, secure chat links and group conversations. The project is split into two main parts:

- **backend/**: Node.js/Express API with Prisma ORM, Redis, and Kafka integration
- **client/**: Next.js 14 frontend with modern UI components

---

## Project Structure

```
chatter/
├── backend/
│   ├── prisma/           # Prisma schema & migrations
│   ├── src/              # Express app source code
│   │   ├── config/       # Kafka, Redis configs
│   │   ├── controllers/  # Route controllers
│   │   ├── db/           # Prisma client
│   │   ├── middlewares/  # Express middlewares
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utility functions
│   │   ├── app.ts        # Main app entry
│   │   ├── socket.ts     # Socket.io logic
│   │   └── helper.ts     # Helper functions
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── public/           # Static assets & images
│   ├── src/              # Next.js app source code
│   │   ├── app/          # App directory (routing, pages)
│   │   ├── components/   # UI & feature components
│   │   ├── fetch/        # API fetch logic
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # API, socket, utils
│   │   └── validations/  # Zod validation schemas
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml    # For local Redis and Kafka
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm (recommended), npm, or yarn
- PostgreSQL (for Prisma)
- Docker (for Redis and Kafka)

---

### 1. Clone the repository

```
git clone https://github.com/your-username/chatter.git
cd chatter
```

---

### 2. Start Redis and Kafka with Docker Compose

This project provides a `docker-compose.yml` to run Redis (with RedisInsight UI) and Kafka (with Zookeeper) locally:

```
docker-compose up -d
```

- Redis: `localhost:6379`
- RedisInsight UI: `localhost:8001`
- Zookeeper: `localhost:2181`
- Kafka: `localhost:9092`

---

### 3. Backend Setup

```
cd backend
pnpm install
```

- Copy `.env.example` to `.env` and fill in your environment variables (Postgres, Redis, Kafka, JWT, etc).
- Run database migrations:

```
pnpm prisma migrate dev
```

- Start the backend server:

```
pnpm dev
```

---

### 4. Client Setup

```
cd ../client
pnpm install
```

- Start the Next.js development server:

```
pnpm dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

### Backend

- `pnpm dev` — Start backend in development mode
- `pnpm build` — Build backend for production
- `pnpm start` — Start backend in production

### Client

- `pnpm dev` — Start Next.js in development mode
- `pnpm build` — Build Next.js app for production
- `pnpm start` — Start Next.js in production

---

## Features

- Instant chat links and group chat creation
- Secure authentication (JWT)
- Real-time messaging (Socket.io)
- Scalable architecture (Kafka, Redis)
- Modern, responsive UI (Next.js 14)

---

## Deployment

- Frontend: Deploy on Vercel, Netlify, or any Next.js-compatible host
- Backend: Deploy on Render, Railway, or any Node.js host

---

## Local Development with Docker Compose

This project includes a `docker-compose.yml` for local development:

- **Redis**: Uses `redis/redis-stack:latest` (includes RedisInsight UI on port 8001)
- **Kafka**: Uses `confluentinc/cp-kafka` and Zookeeper

To start services:

```
docker-compose up -d
```

---

## License

MIT © 2025 QuickChat
