const typeDefs = require('./schema'); // typeDefs
const resolvers = require('./resolvers');

const { ApolloServer } = require("apollo-server");
const server = new ApolloServer({ typeDefs, resolvers });


module.exports = server;