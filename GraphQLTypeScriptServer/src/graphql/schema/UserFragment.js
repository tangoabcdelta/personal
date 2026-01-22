// UserFragment.js
const { gql } = require("apollo-server");

const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    name
    email
  }
`;

module.exports = USER_FRAGMENT;