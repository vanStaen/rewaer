# REWAER

## INSTALL/RUN LOCALLY

Node.js (incl `npm`) will be needed. [https://nodejs.org/en/download/]

Run `npm install` to fetch and install all dependencies listed in the `package.json` file.

- Use `npm run dev` to start the backend server.
- Use `npm run devfr` to start the frontend (Vite/React).
- Both are custom script commands managed in the package file.

Running with node 22: `nvm use 22`.

## ACCESS/DEPLOY

The server can be accessed (after being started) on http://localhost:3003/ locally, or http://127.0.0.1:3003 on the local network.

You can access the deployed version under: https://rewaer.com/


### Debug

To access Heroku's log, run `heroku logs --tail` in the terminal.
The logs saved by the index.js page can be seen at https://rewaer.herokuapp.com/log

### How to deploy

To upload to Heroku, use the CLI tool. To install it: `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`).

For existing repositories, simply add the Heroku remote to git with `heroku git:remote -a rewaer`.

Use `heroku login` to log in to your account. Then `git push heroku master` to deploy the app. `heroku open` to open the app in your browser.

Use the custom script `npm run deploy` to run all of the above commands at once.

#### Heroku CLI slow?

Delete the .netrc file in the home folder (and maybe restart your IDE).
`cmd+shift+.` to show hidden files on Mac.

## IMAGES

### Upload

The object files are saved in an AWS S3 bucket. The library `multer` is used to upload those.

### Manipulation

To generate the image's thumbnail, the library _JIMP_ ("JavaScript Image Manipulation Program") is being used. It can also be used to crop, rotate, flip and mirror images. See documentation for more: https://www.npmjs.com/package/jimp.

## Email

### Email API : SendGrid 

Mails are sent via the SendGrid API. To integrate the API into node, the package `@sendgrid/mail` is used. See its use in the Mail Service (API/Service). More in the documentation under https://app.sendgrid.com/

Some details about the pricing and availability of Sendgrid: https://elements.heroku.com/addons/sendgrid (free up to 12,000 emails per month).

Track email sent: https://app.sendgrid.com/email_activity

