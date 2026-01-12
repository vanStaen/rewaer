import path from "path";
import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { fileURLToPath } from "url";

import db from "./models/index.js";
import graphqlSchema from "./graphql/schema.js";
import graphqlResolver from "./graphql/resolvers.js";
import isAuth from "./middleware/isAuth.js";
import cookieSession from "./middleware/cookieSession.js";
import redirectTraffic from "./middleware/redirectTraffic.js";

import { router as AuthRouter } from "./api/controller/authController.js";
import { router as UserRouter } from "./api/controller/userController.js";
import { router as MailRouter } from "./api/controller/mailController.js";
import { router as UploadRouter } from "./api/controller/uploadController.js";
import { router as PictureRouter } from "./api/controller/pictureController.js";
import { router as SocialRouter } from "./api/controller/socialController.js";
import { router as NotificationRouter } from "./api/controller/notificationController.js";
import { router as SearchRouter } from "./api/controller/searchController.js";
import { router as HealthcheckRouter } from "./api/healthcheck.js";

import "./lib/loadEnv.js";

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
  if (req.get("host") === "localhost:5001") {
    corsOptions = {
      origin: "http://localhost:3003",
      optionsSuccessStatus: 200,
    };
  } else {
    corsOptions = {
      origin: [
        "https://www.rewaer.com",
        "https://rewaer.com",
        "http://rewaer.herokuapp.com",
        "https://rewaer.herokuapp.com",
      ],
      credentials: true,
      optionsSuccessStatus: 200,
    };
  }
  cors(corsOptions)(req, res, next);
});

// Router to API endpoints
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/mail", MailRouter);
app.use("/upload", UploadRouter);
app.use("/picture", PictureRouter);
app.use("/social", SocialRouter);
app.use("/notification", NotificationRouter);
app.use("/search", SearchRouter);
app.use("/healthcheck", HealthcheckRouter);

// Start DB & use GraphQL
db.sequelize.sync().then((req) => {
  app.all(
    "/graphql",
    createHandler({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      context: (req) => req.raw,
      formatError(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occured with GraphQl";
        const code = err.originalError.code || 500;
        return { message, status: code, data };
      },
    }),
  );
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up for React
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
