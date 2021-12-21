# REWAER


## INSTALL/RUN LOCALLY

Node.js (incl `npm`) will be needed. [https://nodejs.org/en/download/]</br>
Run `npm install`tp fetch and install all dependencies listed in the `package.json` file. With `npm run dev` you can start the server on your machine, and with `npm run devfr` you can start the frontend. Both are custom script command managed in the package file.

## ACCESS/DEPLOY

The server can be access (after being started) on http://localhost:5000/ locally, or http://127.0.0.1:5000 on the local netwok.

You can access the deployed version under: https://rewaer.com/
Here is a *curl* exemple to access the users endpoint:`curl --location --request GET 'https://rewaer.com/api/users'` (endpoint doesnt exist anymore, comment stays for documentation purpose).

### Debug

To access heroku's log, run `heroku logs --tail` in the terminal.
The log's saved by the index.js page can be seen at https://rewaer.herokuapp.com/log

### Howto deploy

To upload to heroku, use the CLI tool. To install it go `brew tap heroku/brew && brew install heroku` in the terminal. You can check you have it using `heroku --version`. You will need Git too (`git --version`)</br>

Then, for existing repositories, simply add the heroku remote to git with `heroku git:remote -a rewaer`.

Use `heroku login` to log to your account. Then `git push heroku master`, you can deploy the app. `heroku open` to get the app opened in your browser.

Use the custom script `npm run deploy` to run all of the above commant at once.

#### Heroku CLI slow?
Delete the .netrc file in the home folder (and maybe restart your IDE).
`cmd+shift+point` to show hidden files on mac.

### Alternative host for an older me

See the last seconds of this video (https://www.youtube.com/watch?v=ENrzD9HAZK4) to know how to work and deploy on Google App Engine.


## IMAGES

### Upload

The object file are saved in an AWS S3 bucket. Used is `multer` as a library to upload those.

### Manipulation

To generate the image's thumbnail the library _JIMP_ ("JavaScript Image Manipulation Program") s being used. It can also be used to crop, rotate, flip and mirror images. See documentation for more: https://www.npmjs.com/package/jimp.


## RESSOURCES

### FrontEnd : Overwrite Antd standart color

AntD comes with a standart babyBlue custom color scheme: One can overwrite and customise every single componennt, or change the whole color-theme of ant. Therefore follow the following steps:

1. Install the package _less_: `sudo npm install less -g`.
2. Create a file `rewaer-antd.less`.
3. Fill the file with the following lines (were the color code are the new one you want).

```
@import "../node_modules/antd/lib/style/index.less";
@import "../node_modules/antd/lib/style/components.less";
@primary-color: #6C917D;
@link-color: #6C917D;
```

4. Run `lessc -js src/style/rewaer-antd.less src/style/rewaer-antd.css`.
5. Link the new generated CSS file with your app! 

### Debug React-Router-Dom vs Webpack

The routes with parameters, and input a URL manually were leading to problems.
Here was the solution (incl explainations): https://newbedev.com/using-webpack-with-react-router-bundle-js-not-found