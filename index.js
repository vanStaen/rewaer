const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const db = require("./models");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const isAuth = require("./middleware/isAuth");
const cookieSession = require("./middleware/cookieSession");

require("dotenv/config");

const PORT = process.env.PORT || 5000;

// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Cookie Middleware
app.use(cookieSession);

// Authorization Middleware
app.use(isAuth);

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

// Router to API endpoints
app.use("/auth", require("./api/controller/authController"));
app.use("/upload", require("./api/controller/uploadController"));
app.use("/user", require("./api/controller/userController"));

// Start DB & use GraphQL
db.sequelize.sync().then((req)=> {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,     
      customFormatErrorFn(err) {
        if (!err.originalError) {
          return err
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured with GraphQl';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data}
      } 
    })
  );
});

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));