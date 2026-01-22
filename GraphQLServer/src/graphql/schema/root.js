// src/graphql/schema/root.js
const { gql } = require("apollo-server");

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = rootTypeDefs;