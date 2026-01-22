// src/graphql/schema/common.js
const { gql } = require("apollo-server");

const commonTypeDefs = gql`
  type Error {
    field: String!
    message: String!
  }
`;

module.exports = commonTypeDefs;