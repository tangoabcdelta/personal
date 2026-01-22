// src/graphql/schema/user.js
// OR
// src/graphql/typeDefs/user.js
const { gql } = require("apollo-server");

const userTypeDefs = gql`

  type ID {
    value: String!
  }

  type User {
    id: ID!
    username: String!
    age: Int
  }

  type RegisterResponse {
    user: User
    errors: [Error]
  }


  scalar Void

  extend type Query {
    findRegisteredUserById(id: String!): Void
  }
  


  extend type Query {
    id: String!
    register: RegisterResponse!
  }

  extend type Mutation {
    register(username: String!, password: String!, age: Int): RegisterResponse!
  }

`;

module.exports = userTypeDefs;



