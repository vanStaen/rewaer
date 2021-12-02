import React, { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Looks } from "./pages/Looks/Looks";
import { Items } from "./pages/Items/Items";
import { Info } from "./pages/Info/Info";
import { Profil } from "./pages/Profil/Profil";
import { EditSettings } from "./pages/Profil/EditSettings/EditSettings";
import { Welcome } from "./pages/Welcome/Welcome";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { userStore } from "./stores/userStore/userStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";

import "../src/lib/i18n";

import "./App.css";
import "./style/rewaer-antd.css";

//console.log("Env", process.env.NODE_ENV);
//console.log("Api", process.env.API_URL);

const App = observer(() => {
  const { i18n } = useTranslation();

  useEffect(() => {
    authStore.checkAccess();
    userStore.fetchuserData();
    if (userStore.language === "en") {
      i18n.changeLanguage("en-US");
    } else if (userStore.language === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (userStore.language === "de") {
      i18n.changeLanguage("de-DE");
    }
  }, [userStore.language]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/recoverpwd/:key" component={NewPassword} />
          <Route path="/emailverify/:verifyCode" component={EmailVerified} />
          <Route path="/service">"service page"</Route>
          <Route path="/privacy">"privacy page"</Route>
          <Route path="/info" component={Info} />
          {authStore.hasAccess && <Route path="/looks" component={Looks} />}
          {authStore.hasAccess && <Route path="/items" component={Items} />}
          {authStore.hasAccess && <Route path="/profil" component={Profil} />}
          {authStore.hasAccess && (
            <Route path="/editsettings" component={EditSettings} />
          )}
          <Route path="/">
            {authStore.hasAccess ? <Profil /> : <Welcome showLogin={true} />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
});

export default App;
