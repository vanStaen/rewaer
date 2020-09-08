# REWAER
This repo intend to host the Backend of the app REWEAR. Written with Node.js and JS express. 


## HOW TOs
### HOW TO RUN SCRIPTS
To run custom script, use `npm run script`. For instance: `npm run dev`, will run nodemon index. All the available custom script are listed in the package.json file. 

### HOW TO DEPLOY
The server is at the moment (05.09.2020) hosted on heroku.com. Usual Login, usual pwd!</br>

To upload to heroku, use the CLI tool. To install it go `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`)</br>

Use `heroku login`to log to your account. Then with `heroku create` then `git push heroku master`, you can deploy the app. `heroku open`to get the app opened in your browser. 

#### Alternative host for an older me
See the last seconds of thios video (https://www.youtube.com/watch?v=ENrzD9HAZK4) to know how to work and deploy on Google App Engine. 

## LEARNING:

#### MIDDLEWARE
Middleware in JS Express are function that are placed between `REQ` (request) and `RES` (result), and are use to manipulate the data between the two. One exemple of those, in our code, would be the logger function. 

In order to have in run, it has top be initialised in the main script with `app.use(logger)`. The function itself has been moved to an helper folder to keep a clean main file. 

## RESSOURCES: 

### Tutorial I followed:
Basic of node.js: https://www.youtube.com/watch?v=ENrzD9HAZK4 </br>
Creating a basic server with node.js: https://www.youtube.com/watch?v=fBNz5xF-Kx4 </br>
Web developpement overview in 2020 : https://www.youtube.com/watch?v=0pThnRneDjw </br>  

### Tutorial to watch: 
https://www.youtube.com/watch?v=L72fhGm1tfE (JS Express) </br>
https://www.youtube.com/watch?v=SBvmnHTQIPY (Node.js app from scratch)</br>
https://www.youtube.com/watch?v=W2Z7fbCLSTw (Databases & Models)</br>
https://www.youtube.com/watch?v=vjf774RKrLc (Restful Api With Node.js Express & MongoDB) </br>
https://www.youtube.com/watch?v=vn3tm0quoqE (The async, await and promises) </br>
https://www.youtube.com/watch?v=hdI2bqOjy3c (Javascript) </br>
https://www.youtube.com/watch?v=sBws8MSXN7A (React JS) </br>
https://www.youtube.com/watch?v=R8rmfD9Y5-c (Javascript Array Methods) </br>


(less relevant): </br>
https://www.youtube.com/watch?v=RF5_MPSNAtU (Twitter Bot) </br>
https://www.youtube.com/watch?v=u21W_tfPVrY (VS Code - ten tips) </br>
https://www.youtube.com/watch?v=eB0nUzAI7M8 (GitHub Actions) </br>
https://www.youtube.com/watch?v=6YhqQ2ZW1sc (Gatsby Crash Course) </br>
https://www.youtube.com/watch?v=hQWRp-FdTpc (SSH Crash Course) </br>
https://www.youtube.com/watch?v=JTOJsU3FSD8 </br>
https://www.youtube.com/watch?v=ahCwqrYpIuM </br>
https://www.youtube.com/watch?v=iiADhChRriM </br>
https://www.youtube.com/watch?v=byW6l5T4mxs </br>
https://www.youtube.com/watch?v=vDXkpJw16os </br>
https://reactjs.org/docs/create-a-new-react-app.html </br>