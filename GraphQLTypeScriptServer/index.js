const GraphQLServer = require('./src/graphql');
const PORT = 9005;

GraphQLServer
  .listen({ port: PORT })
  .then(({ url }) => {
    console.log(`server started at ${url}:${PORT}`);
    console.log(`🚀 Server ready at ${url}:${PORT}`);
  });
  