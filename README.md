# REWAER-BACKEND

This repo intend to host the Backend of the app REWEAR. Written with Node.js and JS express. </br>
Please address any questions/comments to admin@rewear.com.

## INSTALL/RUN LOCALLY

Node.js (incl `npm`) will be needed. [https://nodejs.org/en/download/]</br>
Run `npm install`tp fetch and install all dependencies listed in the `package.json` file.
With `npm run dev` you can start the server on your machine.

## ACCESS SERVER

### Local

The server can be access (after being started) on http://localhost:5000/ locally, or http://127.0.0.1:5000 or the local netwok.

### Online

You can access the deployed version under: https://rewaer.herokuapp.com/
Here is a *curl* exemple to access the users endpoint:`curl --location --request GET 'https://rewaer.herokuapp.com/api/users'`

### Debug

To access heroku's log, run `heroku logs --tail` in the terminal.
The log's saved by the index.js page can be seen at https://rewaer.herokuapp.com/log

## DATABASE

**We use MangoDB for this project.** </br>
And use the Mondo Compass as GUI for the database.
Here is the Mongodb doc for usage with Node.js: https://docs.mongodb.com/drivers/node/usage-examples
How to querry the db from javascript: https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#

### Run MongoDB locally:

- how to install mongodb locally on Mac : https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- to run mangoDB, use `brew services start mongodb-community@4.4` from anywhere.
- to stop it, user `brew services stop mongodb-community@4.4`.
- to connect to the Mango shell, `mongo`

cheatsheet for working in the shell:

- `show dbs` - will list all your database
- `use {your db}` - will select your db, or create it if do not exist yet
- `show collections` - will list all collection in your db
- `{your db}.dropDatabase()` - will delete the collection
- `db.{your db}.find()` - will show all data in your db
- `db.{your db}.find().pretty()`- same as before, but easier to read

### MongoDB in the cloud

You can manage the mongoDB under https://cloud.mongodb.com/

#### Heroku IP White listing

Heroku static IP (obtained with the add "QuotaGuard Static IP's") has to be white-listed by mongodb in order to have a working connection. You can check the IP here: https://www.quotaguard.com/dashboard/static

#### Cluster

The cluster is called `rewaer01`, and hosted in a M0 sandbox on AWS (frankfurt).

## DEPLOY

The server is at the moment hosted on heroku.com. Usual Login, usual pwd!</br>

To upload to heroku, use the CLI tool. To install it go `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`)</br>

Then, for existing repositories, simply add the heroku remote to git with `heroku git:remote -a rewaer`.

Use `heroku login` to log to your account. Then `git push heroku master`, you can deploy the app. `heroku open` to get the app opened in your browser.

Use the custom script `npm run deploy` to run all of the above commant at once.

#### Heroku CLI slow?
Delete the .netrc file in the home folder (and maybe restart your IDE).
`cmd+shift+point` to show hidden files on mac.

#### Alternative host for an older me

See the last seconds of this video (https://www.youtube.com/watch?v=ENrzD9HAZK4) to know how to work and deploy on Google App Engine.

## CUSTOM SCRIPT

To run custom script, use `npm run script`. For instance: `npm run dev`, will run nodemon index. All the available custom script are listed (and can be added) in the package.json file, under 'script'.

## MIDDELWARE

Middleware in JS Express are function that are placed between `REQ` (request) and `RES` (result), and are use to manipulate the data between the two. One exemple of those, in our code, would be the logger function.

In order to have in run, it has top be initialised in the main script with `app.use(logger)`. The function itself has been moved to an helper folder to keep a clean main file.

## IS-AUTH

Our ost import middleware is IS-AUTH. It intercept any request, and look for the presence of a token: If present, it will be verified, and the UserID and Email extracted from it. Those information are then used by the resolvers.

## GRAPHQL

Types are :

- Query: get data (like a GET)
- Mutation: change data (like a POST, PUT, PATCH, DELETE)
  Instead of controller (handling a route), resolvers are use to resolve a type.

The error handling is a bit more complicated as with a normal REST API. This tutorial gives a good solution that have been implemented in this project: https://medium.com/@estrada9166/return-custom-errors-with-status-code-on-graphql-45fca360852.

## .ENV

Private or sensible data can be stored and access into and form a .env file: This is listed in the .gitignore, and should never get pushed to git.

Every variable saved in this file should be created in Heroku too, in order to be available to the app in live production. Therefore, one need to add those under `settings/Config Vars` : https://dashboard.heroku.com/apps/rewaer/settings. (more info in the documentation : https://devcenter.heroku.com/articles/config-vars)

The following config vars are needed for this back end:

- DB_REWAER_CONNECTION : Url to connect to the database (including db name, and pwd)
- AUTH_SECRET_KEY: use to encrypt and validate every token from this App.
- S3_BUCKET_ID : Name of the AWS s3 bucket where the pictures are stored
- AWS_IAM_KEY : ID key of the AWS user allowed to use the bucket.
- AWS_IAM_SECRET_KEY: Same as above, but the secret part of the ID data.

## IMAGES

### Upload

The object file are saved in an AWS S3 bucket. Used is `multer` as a library to upload those. A file size limit is fixed at 10M. 

### Manipulation

To generate the image's thumbnail the library _JIMP_ ("JavaScript Image Manipulation Program") s being used. It can also be used to crop, rotate, flip and mirror images. See documentation for more: https://www.npmjs.com/package/jimp.


## MONGODB

We store all data but the images in a mongo database. The code use mongoose to interact with the database. The model save in the eponym folder are to be seen as "types" and are used by mongoose to validate the data pushed to the database. The table are automatically generated based on the models.

Tip: How to integrate different database types with express : https://expressjs.com/en/guide/database-integration.html </br>
