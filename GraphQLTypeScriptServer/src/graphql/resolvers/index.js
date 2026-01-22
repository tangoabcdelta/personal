// const userResolvers = require('./user');

const resolvers = {
  // ...userResolvers,
  // Define the Void scalar behavior
  Void: {
    __parseValue() {
      return null;
    },
    __serialize() {
      return null;
    },
    __parseLiteral() {
      return null;
    },
  },
  Query: {
    hello: () => {
      return "world";
    },
    helloWhatever: (parent, args, context, info) => {
      // Access the 'name' argument from the args object
      const { name } = args;

      // Logic to create the 'finalname'
      const finalname = `Hello, ${name}!`;

      return finalname;
    },
    hifive: () => "High five! 🖐️",
    id: () => "Bond007",
    // This shouldn't be done this way
    // Never execute REST style queries in GraphQL
    isRegistered: (parent, args, context, info) => {
      const id = { args };

      // Perform your logic here (e.g., database insert)
      console.log(`Just calls that the item exists with ID: ${id}`);

      // A "Void" return is represented by null
      return null;
    },
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
