# Step 0 - Breakdown

Let's create a high-level "Enterprise Slayer" architecture for StockSage.

To make this manageable, I have broken the entire requirement down into **8 logical phases**.
We will handle this one step at a time. 

## First Step - Project Initialization & Dependency Injection

Before we write schemas, we need the environment. Since we are "Node-native," we’re going to set up a clean structure that supports Apollo 4 and Prisma.

### The Roadmap

* **Step 1: Project Initialization & Dependency Injection** (Current)
* **Step 2: Database Modeling (Prisma & Postgres)**
* **Step 3: Defining the Type System (GraphQL Schema)**
* **Step 4: Apollo Server Setup & Middleware**
* **Step 5: Implementing Business Logic (The Decision Tree)**
* **Step 6: Building Resolvers & Mutations**
* **Step 7: Real-time Updates (Websocket Subscriptions)**
* **Step 8: Deployment & Hardening**

---

### 1. Initialize your Directory

Open your terminal and run:

```bash
mkdir stocksage-backend
cd stocksage-backend
npm init -y

```

#### 1.a. Install the Core Stack

For a "beast-mode" enterprise setup, TypeScript is non-negotiable—it catches schema mismatches before they ever hit production. Let's tune the environment to **TypeScript** before we touch the database.

##### Install TypeScript Dependencies

Run this in your terminal to add the compiler and the necessary type definitions:

```bash
npm install -D typescript ts-node @types/node @types/express @types/cors

```

##### Initialize TypeScript Configuration

Generate your `tsconfig.json` file:

```bash
npx tsc --init

```

##### Configure `tsconfig.json`

Open the newly created `tsconfig.json` and ensure these settings are active to support our GraphQL/Prisma architecture:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

```

##### Update Project Files

Rename your current `.js` files to `.ts`:

```bash
mv src/index.js src/index.ts
mv src/resolvers/index.js src/resolvers/index.ts

```

##### Update Scripts

Open your `package.json` and update the scripts to use `ts-node` for development:

```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

```

**Your goal for this sub-step:** Ensure you can run `npm run dev` without errors (it will be an empty shell for now). We are now type-safe and ready to build the data layer.

### Install Core Packages for Apollo Ecosystem

Next, we need the Apollo ecosystem, GraphQL, Prisma for the DB, and Express to host it.

```bash
npm install @apollo/server graphql express cors body-parser @prisma/client graphql-subscriptions
npm install -D prisma nodemon

```

### 3. Setup Project Structure

Create the folders and files needed for an enterprise-ready monolith:

```bash
mkdir src
mkdir src/graphql
mkdir src/resolvers
mkdir src/services
touch src/index.js src/graphql/schema.graphql src/resolvers/index.js .env

```

### 4. Initialize Prisma

This creates your `prisma` folder and `.env` file for database connection strings.

```bash
npx prisma init

```

**Your goal for this step:** Get the packages installed and the folders created. Once you have a clean `package.json` and a `prisma/schema.prisma` file generated, you're ready to define the data model.
