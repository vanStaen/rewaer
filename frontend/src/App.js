import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { authStore } from './stores/authStore';
import { observer } from "mobx-react";
import axios from 'axios';

import AuthPage from "./pages/auth/Auth";
import LooksPage from "./pages/looks/Looks";
import ItemsPage from "./pages/items/Items";
import MailPage from "./pages/mail/Mail";
import FriendsPage from "./pages/friends/Friends";
import InfoPage from "./pages/info/Info";
import ProfilPage from "./pages/profil/Profil";
import MenuBar from "./components/MenuBar/MenuBar";

import "./App.css";

const App = observer(() => {

  useEffect(() => {

    // On mount, update token
    authStore.refreshToken && authStore.login(authStore.getNewToken(), authStore.refreshToken);

    //Axios Interceptors
    axios.interceptors.request.use((config) => {
      const token = authStore.token ?
      authStore.token :
      authStore.getNewToken();
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      config.validateStatus = (status) => {
        return true;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

  }, [])

  return (
    <div>
      <BrowserRouter>
        <React.Fragment>
          <MenuBar />
          <main className="main-content">
            <Switch>
              {!authStore.refreshToken && (
                <Redirect from="/" to="/auth" exact />
              )}
              {!authStore.refreshToken && (
                <Route path="/auth" component={AuthPage} />
              )}
              {!authStore.refreshToken && (
                <Redirect from="/looks" to="/auth" exact />
              )}
              {!authStore.refreshToken && (
                <Redirect from="/items" to="/auth" exact />
              )}
              {!authStore.refreshToken && (
                <Redirect from="/mail" to="/auth" exact />
              )}
              {!authStore.refreshToken && (
                <Redirect from="/friends" to="/auth" exact />
              )}
              {!authStore.refreshToken && (
                <Redirect from="/profil" to="/auth" exact />
              )}
              {authStore.refreshToken && (
                <Redirect from="/" to="/profil" exact />
              )}
              {authStore.refreshToken && (
                <Redirect from="/auth" to="/profil" exact />
              )}
              {authStore.refreshToken && (
                <Route path="/looks" component={LooksPage} />
              )}
              {authStore.refreshToken && (
                <Route path="/items" component={ItemsPage} />
              )}
              {authStore.refreshToken && (
                <Route path="/mail" component={MailPage} />
              )}
              {authStore.refreshToken && (
                <Route path="/friends" component={FriendsPage} />
              )}
              {authStore.refreshToken && (
                <Route path="/profil" component={ProfilPage} />
              )}
              <Route path="/info" component={InfoPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
});

export default App;
