// GetUserProfileFragment.js
const { gql } = require("apollo-server");

const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      ...UserFields
      ...AvatarFields
    }
  }
`;

module.exports = GET_USER_PROFILE;