const path = require("path");
const express = require("express");
const cors = require(`cors`)
const { graphqlHTTP } = require("express-graphql");

const db = require("./models");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const isAuth = require("./middleware/isAuth");
const cookieSession = require("./middleware/cookieSession");
const redirectTraffic = require("./middleware/redirectTraffic");

require("dotenv/config");

const PORT = process.env.PORT || 5001;

// Init Express
const app = express();

// Redirect trafic to root and https
app.set("trust proxy", true);
app.use(redirectTraffic);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Cookie Middleware
app.use(cookieSession);

// Authorization Middleware
app.use(isAuth);

// Allow cross origin request
app.use(function (req, res, next) {
  let corsOptions = {};
  if ((req.get('host') === 'localhost:5001')) {
    corsOptions = {
      origin: 'http://localhost:8080',
      optionsSuccessStatus: 200
    }
  } else {
    corsOptions = {
      origin: [
        'https://www.rewaer.com',
        'https://rewaer.com',
        'http://rewaer.herokuapp.com',
        'https://rewaer.herokuapp.com',
      ],
      credentials: true,
      optionsSuccessStatus: 200
    }
  }
  cors(corsOptions)(req, res, next);
})

// Router to API endpoints
app.use('/auth', require('./api/controller/authController'));
app.use('/user', require('./api/controller/userController'));
app.use('/mail', require('./api/controller/mailController'));
app.use('/upload', require('./api/controller/uploadController'));
app.use('/picture', require('./api/controller/pictureController'));
app.use('/social', require('./api/controller/socialController'));
app.use('/notification', require('./api/controller/notificationController'));
app.use('/search', require('./api/controller/searchController'));
app.use('/healthcheck', require('./api/healthcheck'));

// Start DB & use GraphQL
db.sequelize.sync().then((req) => {
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
        const message = err.message || 'An error occured with GraphQl';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data }
      }
    })
  );
});

// Set up for React
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));