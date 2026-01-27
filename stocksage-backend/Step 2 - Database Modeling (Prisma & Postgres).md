# Step 2: Database Modeling (Prisma & Postgres)

Now that our TypeScript environment is locked in, we need to build the physical foundation. We’ll use **Prisma** to map your stock market logic into **PostgreSQL**. This is where your portfolios, trades, and indicators live.

## 1. Configure your Connection

Open your `.env` file and point it to your Postgres instance (use a local Postgres or a cloud provider like Railway/Neon):

```text
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/stocksage?schema=public"

```

## 2. Define the Schema

Open `prisma/schema.prisma`. We are going to translate the PRD requirements into models. Note the use of `Json` for the decision tree and fees—this gives us "Enterprise Slayer" flexibility without migrations every time a new indicator is added.

Paste this into `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrderType {
  MARKET
  LIMIT
  STOPLOSS
  INTRADAY
  CNC
}

model StockIndicator {
  id        String   @id @default(cuid())
  symbol    String   @unique
  pe        Float
  pb        Float
  de        Float
  roe       Float
  peg       Float
  current   Float
  updatedAt DateTime @updatedAt
}

model Portfolio {
  id      String  @id @default(cuid())
  userId  String  @unique
  trades  Trade[]
}

model Trade {
  id          String    @id @default(cuid())
  symbol      String
  type        OrderType
  qty         Float
  buyPrice    Float
  sellPrice   Float?
  pnl         Float     @default(0)
  fees        Json      // Stores brokerage, stt, exchange fees
  timestamp   DateTime  @default(now())
  
  portfolio   Portfolio @relation(fields: [portfolioId], references: [id])
  portfolioId String
}

model DecisionTree {
  id        String   @id @default(cuid())
  symbol    String
  thesis    String
  score     Float
  nodes     Json     // Serialized tree structure for persistence
  createdAt DateTime @default(now())
}

```

## 3. Generate and Migrate

Run these commands to sync your code with your database and generate the TypeSafe client:

```bash
# Creates the physical tables in Postgres
npx prisma migrate dev --name init_schema

# Generates the Prisma Client (TypeScript types)
npx prisma generate

```

## 4. Create a Database Singleton

To avoid "too many clients" errors in development, create `src/lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

```

**Your goal for this step:** Successfully run the migration. This confirms your backend is officially "connected" to a real data layer.

**Next Step**, we define the GraphQL Type System (SDL).
