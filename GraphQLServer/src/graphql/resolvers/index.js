// const userResolvers = require('./user');

const resolvers = {
  // ...userResolvers,
  Query: {
    hello: () => {
      return "world"
    },
    hifive: () => "hi5",
    id: () => "Bond007",
    register: () => ({
      errors: [
        {
          field: "test",
          message: "test error message",
        },
        {
          field: "test 2",
          message: "2nd test error message",
        },
        null,
      ],
      id: 1,
      username: "test name",
    }),
  },
  Mutation: {
    register: () => ({
      errors: [
        {
          field: "test",
          message: "test error message",
        },
        {
          field: "test 2",
          message: "2nd test error message",
        },
        null,
      ],
      id: 1,
      username: "test name",
    }),
  },
};


module.exports = resolvers;