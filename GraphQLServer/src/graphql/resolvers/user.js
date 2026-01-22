const User = require('../../models/User');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => await User.findById(id),
    allUsers: async () => await User.find(),
  },
};

module.exports = userResolvers;