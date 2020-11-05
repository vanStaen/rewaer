const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const logger = require("./middleware/logger");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.PORT || 5000;
require("dotenv/config");

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross orign request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Logger Middelware
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Static pointing to the logs
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, "routes.log"));
});

// Endpoint routes handlers:
app.use("/api/auth", require("./api/auth"));

// Authorization Middleware
app.use(isAuth);

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
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
