# REWAER-FRONTEND

This repo intend to host the Frontend of the app REWEAR. Written with React JS. </br>
Please address any questions/comments to admin@rewear.com.

## INSTALL, RUN LOCALLY & DEPLOY

Node.js (incl `npm`) will be needed. [https://nodejs.org/en/download/]</br>
Run `npm install` to fetch and install all dependencies listed in the `package.json` file.
With `npm start` you can start the server on your machine. With `npm deploy` you can deploy the app to Heroku.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Runninng the command 'npm run deploy' will trigger the deployment of the master branch on Heroku. The standart detected node.js buildpack seems not to work for react app. To fix this, do the following in ther Heroku CLI:

```
heroku buildpacks:clear
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack
```

## LEARNING:

### State management

~~So far I have been using the context API to store information between component: Coupled with usage of local storage, this seems to work fine, but is still working a bit crooked. I neeg to spent some time with _MobX_ or _Redux_ as I think those are what I will need to use in the near future.~~

State management with MobX.

### Fetch() vs Axios()

Through this project I use a mix of both solution to fetch data from the backend. I will clean it inorder to user only axios, even though I haven't found a huge advantage at using Axios so far. Reading this (https://blog.logrocket.com/axios-or-fetch-api/) was instructive, but not really telling you where to fall.

#### Axios interceptors?

Axios is used everytime a request is made with a token : The interceptor feature of axios is used in case of a invalid token, to get this token refreshed. More info on this there: https://github.com/axios/axios#interceptors / https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token.

## RESSOURCES

### npm run eject

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Overwrite Antd standart color

AntD comes with a standart babyBlue custom color scheme: One can overwrite and customise every single componennt, or change the whole color-theme of ant. Therefore follow the following steps:

1. Install the package _less_: `sudo npm install less -g`.
2. Create a file `rewaer-theme.less` under `/node_module/antd/dist`.
3. Fill the file with the 3 lines (were the color code are the new one you want0).

```
@import “./antd.less”;
@primary-color: #6C917D ;
@link-color: #6C917D;
```

4. From the directory `/node_module/antd/dist` run `lessc -js my-theme.less ../../../src/style/rewaer-antd.css`.
5. In `app.css`, update the first import to target the file created file: `@import "../src/style/rewaer-antd.css";`
