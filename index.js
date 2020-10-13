const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const graphqlHttp = require("express-graphql");

const graphqlResolver = require("schema");
const graphqlSchema = require("resolvers");
const logger = require("./helpers/logger");

require("dotenv/config");
const PORT = process.env.PORT || 5000;

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middelware
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Static pointing to the logs
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, "routes.log"));
});

// Endpoint routes handlers:
app.use("/api/users", require("./api/users"));
app.use("/api/looks", require("./api/looks"));
app.use("/api/items", require("./api/items"));

// GraphQL
app.use(
  "/graphql",
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
  })
);

// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
