const graphqlHttp = require("express-graphql");
const graphqlResolver = require("schema");
const graphqlSchema = require("resolvers");

graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) {
    if (!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || "Something went wrong with GraphQL!";
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  },
});
