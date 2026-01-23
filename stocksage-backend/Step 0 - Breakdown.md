# Step 0 - Breakdown

Let's create a high-level "Enterprise Slayer" architecture for StockSage.

To make this manageable, I have broken the entire requirement down into **8 logical phases**.
We will handle this one step at a time. 

## First Step

I’ll give you the exact commands and code for the first step now.

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

## Step 1: Project Initialization & Dependency Injection

Before we write schemas, we need the environment. Since we are "Node-native," we’re going to set up a clean structure that supports Apollo 4 and Prisma.

### 1. Initialize your Directory

Open your terminal and run:

```bash
mkdir stocksage-backend
cd stocksage-backend
npm init -y

```

### 2. Install the Core Stack

We need the Apollo ecosystem, GraphQL, Prisma for the DB, and Express to host it.

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

