import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <div className="App">Info
        <Routes>
          <Route path="/recoverpwd/:key" element={<NewPassword/>} />
          <Route path="/emailverify/:verifyCode" element={<EmailVerified/>} />
          <Route path="/info" element={<Info/>} />
          {authStore.hasAccess && <Route path="/looks" element={<Looks/>} />}
          {authStore.hasAccess && <Route path="/items" element={<Items/>} />}
          {authStore.hasAccess && <Route path="/profil" element={<Profil/>} />}
          {authStore.hasAccess && (
            <Route path="/editsettings" element={<EditSettings/>} />
          )}
          {authStore.hasAccess ? (
            <Route path="/" element={<Profil/>} />
          ) : (
            <Route path="/" element={<Welcome showLogin={true}/>} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
});

export default App;
