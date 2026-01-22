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

**Would you like me to help you write the `server.js` code to tie these folders together using Apollo Server or Express-GraphQL?**

---
