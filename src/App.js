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
import { pageStore } from "./stores/pageStore/pageStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { archiveAccount } from "./pages/Profile/EditSettings/DeleteAccountButton/archiveAccount";
import { Notifications } from "./pages/Notifications/Notifications";
import { Search } from "./pages/Search/Search";
import { Footer } from "./components/Footer/Footer";

import "../src/lib/i18n";

import "./App.css";
import "./style/rewaer-antd.css";

const TRESHOLD_FLOATING_FORMS = 800;
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
    pageStore.fetchNotifications();
    //Fetch new notification every minute
    setInterval(pageStore.fetchNotifications, 60000);
  }, []);

  const resetWindowInners = () => {
    pageStore.setWindowInnerHeight(window.innerHeight);
    pageStore.setWindowInnerWidth(window.innerWidth);
    pageStore.setShowOnlyFloatingUploadForm(window.innerWidth < TRESHOLD_FLOATING_FORMS)
  };

  useEffect(() => {
    //initialize variables
    pageStore.setWindowInnerHeight(window.innerHeight);
    pageStore.setWindowInnerWidth(window.innerWidth);
    pageStore.setShowOnlyFloatingUploadForm(window.innerWidth < TRESHOLD_FLOATING_FORMS)
    //Event listener
    window.addEventListener("resize", resetWindowInners);
    return () => {
      window.removeEventListener("resize", resetWindowInners);
    };
  }, [resetWindowInners]);

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
        {authStore.hasAccess && <MenuBar visitor={false} />}
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
              <Route path="notifications/" element={<Notifications />} />
              <Route path="search/" element={<Search />} />
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
        {/* authStore.hasAccess && <Footer /> */}
      </div>
    </BrowserRouter>
  );
});

export default App;
