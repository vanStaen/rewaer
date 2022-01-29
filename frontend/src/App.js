import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { notification } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Looks } from "./pages/Looks/Looks";
import { Items } from "./pages/Items/Items";
import { Info } from "./pages/Info/Info";
import { Profile } from "./pages/Profile/Profile";
import { EditSettings } from "./pages/Profile/EditSettings/EditSettings";
import { Welcome } from "./pages/Welcome/Welcome";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { userStore } from "./stores/userStore/userStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { CustomMenuBar } from "./components/CustomMenuBar/CustomMenuBar";
import { Footer } from "./components/Footer/Footer";
import { archiveAccount } from "./pages/Profile/EditSettings/DeleteAccountButton/archiveAccount";

import "../src/lib/i18n";

import "./App.css";
import "./style/rewaer-antd.css";

//console.log("Env", process.env.NODE_ENV);
//console.log("Api", process.env.API_URL);

const App = observer(() => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    authStore.checkAccess();
    userStore.fetchUserData();
  }, []);

  useEffect(() => {
    userStore.fetchUserData();
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (userStore.language === "en") {
      i18n.changeLanguage("en-US");
    } else if (userStore.language === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (userStore.language === "de") {
      i18n.changeLanguage("de-DE");
    }
  }, [userStore.language]);

  useEffect(() => {
    // Check if account was archived
    if (userStore.archived) {
      archiveAccount(false);
      notification.success({
        message: (
          <>
            <b>{t("profile.accountReactivated")}</b>
            <br />
            {t("profile.gladToHaveYouBack")}
          </>
        ),
        placement: "bottomRight",
      });
    }
  }, [userStore.archived]);

  return (
    <BrowserRouter>
      <div className="App">
        {authStore.hasAccess && <CustomMenuBar />}
        <Routes>
          <Route path="recoverpwd/:key" element={<NewPassword />} />
          <Route path="emailverify/:verifyCode" element={<EmailVerified />} />
          <Route path="info/" element={<Info />} />
          {authStore.hasAccess && (
            <>
              <Route path="looks/" element={<Looks />} />
              <Route path="items/" element={<Items />} />
              <Route path="profile/" element={<Profile />} />
              <Route path="editsettings/" element={<EditSettings />} />
            </>
          )}
          <Route path="/:username" element={<Profile />} />
          {authStore.hasAccess ? (
            <>
              <Route path="/" element={<Profile />} />
            </>
          ) : (
            <Route path="/" element={<Welcome showLogin={true} />} />
          )}
        </Routes>
        {authStore.hasAccess && <Footer />}
      </div>
    </BrowserRouter>
  );
});

export default App;
