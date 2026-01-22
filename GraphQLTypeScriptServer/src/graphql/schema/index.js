// src/graphql/schema/index.js

const { gql } = require("apollo-server");

const rootTypeDefs = require("./root");
const helloWorldTypeDefs = require("./helloworld");
const userTypeDefs = require("./user");


const commonTypeDefs = require("./common");

const USER_FRAGMENT = require('./UserFragment');
const AVATAR_FRAGMENT = require('./AvatarFragment');
const GET_USER_PROFILE = require('./GetUserProfileFragment');


const typeDefs = gql`
  type Query {
    hello: String!
    id: String!
  }

  ${USER_FRAGMENT}

  ${AVATAR_FRAGMENT}

  ${GET_USER_PROFILE}
`;

// Export as an array
module.exports = [
  rootTypeDefs,
  helloWorldTypeDefs,
  userTypeDefs,
  commonTypeDefs
];
