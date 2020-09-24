# REWAER

This repo intend to host the Backend of the app REWEAR. Written with Node.js and JS express.

## INSTALL/RUN LOCALY

Node.js (incl `npm`) will be needed. [https://nodejs.org/en/download/]</br>
Run `npm install`tp fetch and install all dependencies listed in the `package.json` file.
With `npm run dev` you can start the server on your machine.

## ACCESS SERVER

### Local

The server can be access (after being started) on http://localhost:5000/ locally, or http://127.0.0.1:5000 or the local netwok.

### Online

You can access the deployed version under: https://rewaer-backend.herokuapp.com/

Here is a curl exemple to access the pictures endpoint:`curl --location --request GET 'https://rewaer-backend.herokuapp.com/api/pictures'`

The log can be seen at https://rewaer-backend.herokuapp.com/log

## DEPLOY

The server is at the moment hosted on heroku.com. Usual Login, usual pwd!</br>

To upload to heroku, use the CLI tool. To install it go `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`)</br>

Then, for existing repositories, simply add the heroku remote to git with `heroku git:remote -a rewaer-backend`.

Use `heroku login` to log to your account. Then `git push heroku master`, you can deploy the app. `heroku open` to get the app opened in your browser.

Use the custom script `npm run deploy` to run all of the above commant at once.

#### Alternative host for an older me

See the last seconds of this video (https://www.youtube.com/watch?v=ENrzD9HAZK4) to know how to work and deploy on Google App Engine.

## LEARNING:

### Custom Script

To run custom script, use `npm run script`. For instance: `npm run dev`, will run nodemon index. All the available custom script are listed (and can be added) in the package.json file, under 'script'.

### JS Express - middleware functions

Middleware in JS Express are function that are placed between `REQ` (request) and `RES` (result), and are use to manipulate the data between the two. One exemple of those, in our code, would be the logger function.

In order to have in run, it has top be initialised in the main script with `app.use(logger)`. The function itself has been moved to an helper folder to keep a clean main file.

## RESSOURCES:

How to integrate different database types with express.
https://expressjs.com/en/guide/database-integration.html </br>

### Tutorial I followed:

- Web developpement overview in 2020 : https://www.youtube.com/watch?v=0pThnRneDjw </br>
- Basic of node.js: https://www.youtube.com/watch?v=ENrzD9HAZK4 </br>
- Creating a basic server with node.js: https://www.youtube.com/watch?v=fBNz5xF-Kx4 </br>
- Creating a API with JS Express: https://www.youtube.com/watch?v=L72fhGm1tfE</br>

### Tutorial to watch:

https://www.youtube.com/watch?v=2bW3HuaAUcY (MySQL in 10 min)</br>
https://www.youtube.com/watch?v=W2Z7fbCLSTw (Databases & Models)</br>
https://www.youtube.com/watch?v=-56x56UppqQ (MongoDB Crash course) </br>
https://www.youtube.com/watch?v=vjf774RKrLc (Restful Api With Node.js Express & MongoDB) </br>
https://www.youtube.com/watch?v=6FOq4cUdH8k (Auth app in node with mondo compt. db) </br>

### other and less relevant: </br>

https://www.youtube.com/watch?v=SBvmnHTQIPY (Node.js app from scratch) </br>
https://www.youtube.com/watch?v=vn3tm0quoqE (The async, await and promises) </br>
https://www.youtube.com/watch?v=hdI2bqOjy3c (Javascript) </br>
https://www.youtube.com/watch?v=sBws8MSXN7A (React JS) </br>
https://www.youtube.com/watch?v=R8rmfD9Y5-c (Javascript Array Methods) </br>
https://www.youtube.com/watch?v=RF5_MPSNAtU (Twitter Bot) </br>
https://www.youtube.com/watch?v=u21W_tfPVrY (VS Code - ten tips) </br>
https://www.youtube.com/watch?v=eB0nUzAI7M8 (GitHub Actions) </br>
https://www.youtube.com/watch?v=6YhqQ2ZW1sc (Gatsby Crash Course) </br>
https://www.youtube.com/watch?v=hQWRp-FdTpc (SSH Crash Course) </br>
https://www.youtube.com/watch?v=4PZb0tkxuUk (GPG Encryption for beginners) </br>
https://www.youtube.com/watch?v=BwuLxPH8IDs (typescript 3h tutorial) </br>
https://www.youtube.com/watch?v=Mus_vwhTCq0 (javascript tips) </br>
https://www.youtube.com/watch?v=c5SIG7Ie0dM (javascript vanilla UX project) </br>
https://www.youtube.com/watch?v=JTOJsU3FSD8 </br>
https://www.youtube.com/watch?v=ahCwqrYpIuM </br>
https://www.youtube.com/watch?v=iiADhChRriM </br>
https://www.youtube.com/watch?v=byW6l5T4mxs </br>
https://www.youtube.com/watch?v=vDXkpJw16os </br>
https://reactjs.org/docs/create-a-new-react-app.html </br>
https://medium.com/javascript-in-plain-english/how-to-schedule-cron-jobs-in-node-js-897215e2e5d3 (Node.js: send enmail and cronjob) </br>
https://www.youtube.com/watch?v=tBr-PybP_9c (messagerie app with react) </br>
https://www.youtube.com/watch?v=8GPPJpiLqHk (10 hack javascript project) </br>
https://www.youtube.com/watch?v=I6ypD7qv3Z8 (Fullstack React GraphQL TypeScript Tutorial 12hours) </br>
https://www.youtube.com/watch?v=3nLTB_E6XAM (React hook and router: Responsive website) </br>
https://www.youtube.com/watch?v=gq5yubc1u18 (URL Shortener in 3133.7 seconds with Node.js + Express + MongoDB) </br>
https://www.youtube.com/watch?v=dtKciwk_si4 (TODO LIST in react and vamilla JS)
