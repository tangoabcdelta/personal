// AvatarFragment.js
const { gql } = require("apollo-server");

const AVATAR_FRAGMENT = gql`
  fragment AvatarFields on User {
    avatarUrl
  }
`;

module.exports = AVATAR_FRAGMENT;