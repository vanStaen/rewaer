const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const logger = require("./middleware/logger");
const isAuth = require("./middleware/is-auth");
const { errorType } = require("./config/errors")

const getErrorCode = errorName => {
  return errorType[errorName];
}

const PORT = process.env.PORT || 5000;
require("dotenv/config");

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross origin request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Logger Middleware
app.use(logger);

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// Static pointing to the logs
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, "routes.log"));
});

// Authorization Middleware
app.use(isAuth);

// Router to API
app.use("/upload", require("./api/upload"));
app.use("/thumbs", require("./api/thumbs"));

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: false,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      const message = error.message || "Something went wrong with GraphQL!";
      const code = error.statusCode || 500;
      return { message: message, status: code };
    }
  })
);

// Fix mongoose deprecation warning
mongoose.set('useCreateIndex', true);

// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
