import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import LooksPage from "./pages/looks/Looks";
import ItemsPage from "./pages/items/Items";
import InfoPage from "./pages/info/Info";
import Profil from "./pages/profil/Profil";
import MenuBar from "./components/MenuBar/MenuBar";
import { authStore } from "./stores/authStore";
import { Welcome } from "./pages/Welcome/Welcome";

import "./App.css";

const App = observer(() => {
  useEffect(() => {
    authStore.checkAccess();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/recoverpwd" to="/" />
          <Redirect from="/invite" to="/" />
          <Redirect from="/emailverify" to="/" />
          <Route path="/recoverpwd/:key" component={NewPassword} />
          <Route path="/invite/:inviteCode" component={Welcome} />
          <Route path="/emailverify/:verifyCode" component={EmailVerified} />
          <Route path="/service">"service page"</Route>
          <Route path="/privacy">"privacy page"</Route>
          <Route path="/settings">"settings page"</Route>
          {authStore.hasAccess && <Route path="/looks" component={LooksPage} />}
          {authStore.hasAccess && <Route path="/items" component={ItemsPage} />}
          {authStore.hasAccess && <Route path="/profil" component={Profil} />}
          {authStore.hasAccess && <Route path="/info" component={InfoPage} />}
          {authStore.hasAccess ? <Home /> : <Welcome showLogin={true} />}
        </Switch>
      </div>
    </Router>
  );
});

export default App;
