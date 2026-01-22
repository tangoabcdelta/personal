const { gql } = require('apollo-server');

const helloWorldTypeDefs = gql`
  extend type Query {
    hello: String!
    hifive: String!
    id: String!
  }
`;

module.exports = helloWorldTypeDefs;