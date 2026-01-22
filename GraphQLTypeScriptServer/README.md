# GraphQL with Javascript

## How to Start the Server

1. Just go to the root of the project and hit `npm start`
2. Go to http://localhost:9005/
3. Click 'Query Your Server' button
4. You will be taken to `https://studio.apollographql.com/sandbox?endpoint=http%3A%2F%2Flocalhost%3A9005%2F`

## How to Query and Mutate

Now, type out below example queries and mutations to see if you get the same result.

### Example 1: Simple "hello world"

Let's try out the simplest hello-world query.

```graphql
query {
  hello
}
```

#### Response 1

- **Let's see how this works:**
- We have defined `src\graphql\schema\helloworld.js` the `typeDefs` i.e. the schemas
- And, their corresponding resolvers in `\src\graphql\resolvers\index.js`
- The apollo server reads the query and forwards it to the right resolvers

```json
{
  "data": {
    "hello": "world"
  }
}
```

### Example 2: Say "hifive" with "hello world" and introduce yourself as James Bond

```graphql
query {
  hello
  hifive
  id
}

```

#### Response 2 & 3

```json
{
  "data": {
    "hello": "world",
    "hifive": "hi5",
    "id": "Bond007"
  }
}
```

## Mutation Examples

- To write a GraphQL mutation query, you need to match the structure of the data it returns.
- The `register` field returns an object containing an array of `errors` and user details like `id` and `username`.

### The Mutation Query - How to structure the request

Based on the `userTypeDefs`, the mutation query needs to pass the arguments (`username`, `password`, and `age`) directly into the `register` field.

### How to pass the variables to Mutation Query

When writing the query,

- First, you define the variable types in the header (the `mutation` line) and,
- Then pass them into the `register` argument list.

```graphql
mutation Register($username: String!, $password: String!, $age: Int) {
  register(username: $username, password: $password, age: $age) {
    user {
      id {
        value
      }
      username
      age
    }
    errors {
      field
      message
    }
  }
}

```

### 2. The Variables (JSON)

In your frontend (or GraphQL Playground/Apollo Studio), you provide the values in a separate JSON object:

```json
{
  "username": "test name",
  "password": "mypassword123",
  "age": 25
}

```

### Basic Hygiene

**Remember**: In GraphQL, the `Register` in `mutation Register(...)` is technically called the **Operation Name**. Think of it like naming a function in JavaScript versus using an anonymous function. You can technically write a "shorthand" mutation like this, and it will work perfectly fine:

```graphql
mutation($username: String!) {
  register(username: $username) {
    user {
      username
    }
  }
}
```

Even though it's optional, naming your operations is a professional standard.

- **Debugging & Logging:** When your server logs an error, it's much easier to see `Error in operation: RegisterUser` than `Error in operation: anonymous`.
- **APM (Application Performance Monitoring):** Tools like Apollo Studio, Datadog, or New Relic group metrics by operation name. If you don't name them, all your mutations get lumped together into one "anonymous" bucket, making it impossible to see which specific mutation is slow.
- **Client-side Caching:** Some frontend libraries (like Apollo Client) use operation names to help manage how data is cached or refetched.
- **Readability:** Just like code, it tells the next developer (or future you) exactly what the intent of this query is without needing to read the whole selection set.

---

### A Quick Summary Table

| Part of Query | Technical Term | Mandatory? | Purpose |
| --- | --- | --- | --- |
| `mutation` | **Operation Type** | Yes | Tells the server if this is a Read (Query) or Write (Mutation). |
| `RegisterUser` | **Operation Name** | **No** | For logging, debugging, and tracking. |
| `$username` | **Variable Definition** | Yes (if used) | Declares what data types the query expects. |
| `register(...)` | **Field / Resolver** | Yes | The actual function on the server you are calling. |

---

### Important Observations for your Schema

1. **The ID Type**: You defined a custom `type ID { value: String! }`. GraphQL has a built-in `ID` scalar. So, you need not pass it as a sub-field.
2. **The Resolver Match**: Your previous resolver returned `id` and `username` at the top level, but your `RegisterResponse` type expects a `user` object. You will need to wrap the user data in your resolver to match the schema:

**Corrected Resolver to match your TypeDefs:**

```javascript
register: (_, { username, password, age }) => {
  return {
    user: {
      id: { value: "1" }, // Matches your 'type ID' object
      username: username,
      age: age
    },
    errors: [] // Or your error array
  };
}

```

### Why the query works this way

The flow of data follows a specific path from your client to your server:

1. **Variables Declaration**: `$username: String!` tells GraphQL to expect a required string from the client.
2. **Argument Passing**: `register(username: $username)` maps that client variable to the resolver's argument.
3. **Selection Set**: `{ user { id { value } } }` tells the server exactly which nested pieces of data to send back.

Would you like me to show you how to handle that `null` value you had in your error array so it doesn't break the frontend?

---

## GraphQL Project Structure for Node.js 10-16

When building a GraphQL API in a Node.js environment (versions 10-16), follow the "Separation of Concerns" principle and prefer to use a **modular structure**  over a monolithic `index.js` file.

This shall make the project easier to scale as you add more entities.

### Recommended Modular Structure

- For Node.js 10-16, you will have to use CommonJS (`require`) syntax.
- A production-ready structure is given below.
- This keeps code that "changes together" in the same place.

```text
graphqlserver/
├── src/
│   ├── graphql/             # Core GraphQL logic
│   │   ├── schema/          # Schema definitions (SDL)
│   │   │   ├── index.js     # Merges all typeDefs
│   │   │   ├── root.js      # Defines empty Query/Mutation 
│   │   │   ├── common.js    # Shared / Resuable types (Error)
│   │   │   ├── user.js      # User & Registration types
│   │   │   └── post.js
│   │   ├── resolvers/       # Resolver functions
│   │   │   ├── index.js     # Merges all resolvers
│   │   │   ├── user.js      # Register mutation logic
│   │   │   └── post.js
│   │   └── index.js         # Combines typeDefs + resolvers into a schema
│   ├── models/              # Database models (Mongoose, Sequelize, etc.)
│   ├── services/            # Business logic/Data fetchers
│   ├── utils/               # Helper functions
│   ├── server.js            # Express / Apollo Server setup
│   └── config.js            # Environment variables and constants
├── .env
├── package.json
└── index.js                 # Entry point (calls server.js)

```

### File Org Implementation Details

#### 1. Defining TypeDefs (`src/graphql/typeDefs/user.js`)

Instead of one massive string, define your types in separate files using the `gql` tag or template literals.

```javascript
const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    allUsers: [User]
  }
`;

module.exports = userTypeDefs;

```

#### 2. Writing Resolvers (`src/graphql/resolvers/user.js`)

Keep your resolver logic separate from the schema definition.

```javascript
const User = require('../../models/User');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => await User.findById(id),
    allUsers: async () => await User.find(),
  },
};

module.exports = userResolvers;

```

#### 3. Merging in the Central GraphQL Index (`src/graphql/index.js`)

Use a utility like `lodash.merge` or simple object spreading to combine your modules. This is the file you will import into your `server.js`.

```javascript
const userTypeDefs = require('./typeDefs/user');
const userResolvers = require('./resolvers/user');
// Import other modules...

const typeDefs = [userTypeDefs /*, otherTypeDefs */];
const resolvers = [userResolvers /*, otherResolvers */];

module.exports = { typeDefs, resolvers };

```

---

### Why this works for Node 10-16

* **CommonJS Compatibility:** Uses `module.exports` and `require`, which is the standard for these Node versions.
* **Scalability:** If you add a "Product" entity, you simply create `typeDefs/product.js` and `resolvers/product.js` and add them to the central index.
* **Testability:** You can test resolvers as isolated JavaScript functions without needing to boot the entire GraphQL server.

[GraphQL project structure tutorial](https://www.youtube.com/watch?v=9tI4SlymIns)
This video provides a step-by-step walkthrough of organizing schemas, resolvers, and models in a real-world Node.js GraphQL application.

---
