# Step 2: Database Modeling (Prisma & Postgres)

Now that our TypeScript environment and Apollo dependencies are locked in, we need to build the physical foundation. We’ll use **Prisma** to map your stock market logic into **PostgreSQL**. This is where your portfolios, trades, and indicators live.

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

## 3.a. Postgresql Set Up

### Starting/Stopping the PostgreSQL Service

#### Starting from Windows Services

This by far is the most convenient method.

- Press `Win + R`
- Type `services.msc`
- Find the PostgreSQL service
- Right-click, and
- Select Start/Stop/Restart.
- To check the status
  - Run the command `sc query postgresql-x64-[version]`
    - Remember to replace postgresql-x64-[version] with your actual service name and version.
    - The output will show the `STATE` as `RUNNING` or `STOPPED`.
  - You can also use the built-in PostgreSQL utility `pg_isready`
    - This checks the connection status of the server.
    - Open Command Prompt or PowerShell.
    - Navigate to your PostgreSQL installation's bin directory `C:\Program Files\PostgreSQL\<version>\bin`
    - Open `cmd` and run the command: `pg_isready -h localhost -p 5432 -U postgres`
      - `-h localhost`: Specifies the host.
      - `-p 5432`: Specifies the port (default is 5432).
      - `-U postgres`: Specifies the user.
    - The output will indicate if the server is accepting connections, rejecting connections, or has no response.
    - Generally, the output will be `localhost:5432 - accepting connections`
    - A return code of 0 also means it is accepting connections.

## 3.b. Generate and Migrate

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

---------------------------------------------

## Warning: Instructions incomplete.

### Postgres Set up

#### Start from Command Line

- Go to the path for `bin` folder in Command Prompt/Git Bash
- Use `pg_ctl.exe start/stop/restart -D "<path_to_data_directory>"`

##### Path

- Add pg_ctl to your system `PATH`
- Navigate to your PostgreSQL bin directory
- Typical installation location:
  - On Windows `C:\Program Files\PostgreSQL\{version}\bin`
  - On Linux `/usr/lib/postgresql/{version}/bin`
- Append it to your environment variables.
- For Linux/macOS, add `export PATH=$PATH:/path/to/postgresql/bin` to your `~/.bashrc` or `~/.zshrc` file.

##### Set Data Directory

- **Initialize Directory**: Pointing to an empty or a wrong directory or a directory with incorrect permissions will lead to an error. And therefore, an empty folder must be initialized.
  - The directory for data must not be empty and must have been initialized using `{Link: initdb -D /path/to/data https://www.postgresql.org/docs/current/app-pg-ctl.html}`.
  - PostgreSQL must be able to find necessary system files like `PG_VERSION` and/or `postgresql.conf` in the specified data directory (`-D`).
  - The `-D` flag must also point to a parent folder rather than the specific directory containing the `base/`, `global/`, and `pg_xlog/` subdirectories.
  
Specify the directory using the `-D` option: The `-D` or `--pgdata` option allows you to explicitly provide the path to your data directory with each `pg_ctl` command.

```bash
pg_ctl -D /path/to/your/data/directory [command]
```

- To start the server: `pg_ctl -D /var/lib/pgsql/data start`
- To check the server status: `pg_ctl -D /var/lib/pgsql/data status`
- To stop the server: `pg_ctl -D /var/lib/pgsql/data stop`

--------------
