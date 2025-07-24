import React, { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { notification } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Looks } from "./pages/Looks/Looks";
import { Items } from "./pages/Items/Items";
import { Info } from "./pages/Info/Info";
import { Profile } from "./pages/Profile/Profile";
import { EditSettings } from "./pages/Settings/EditSettings";
import { Welcome } from "./pages/Welcome/Welcome";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { userStore } from "./stores/userStore/userStore";
import { pageStore } from "./stores/pageStore/pageStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { archiveAccount } from "./pages/Settings/actions/archiveAccount";
import { Notifications } from "./pages/Notifications/Notifications";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { Footer } from "./components/Footer/Footer";
import {
  THRESHOLD_FLOATING_FORMS,
  FETCH_NEW_NOTIF_IN_MILLISECONDS,
} from "./lib/data/setup";

import "./lib/i18n";

import "./App.less";
import "./style/colors.less";
import "./style/customAntd.less";
import "./style/commun.less";

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
    // Fetch new notification every minute
    setInterval(pageStore.fetchNotifications, FETCH_NEW_NOTIF_IN_MILLISECONDS);
  }, []);

  const resetWindowInners = () => {
    pageStore.setWindowInnerHeight(window.innerHeight);
    pageStore.setWindowInnerWidth(window.innerWidth);
    pageStore.setShowOnlyFloatingUploadForm(
      window.innerWidth < THRESHOLD_FLOATING_FORMS,
    );
  };

  useEffect(() => {
    // initialize variables
    pageStore.setWindowInnerHeight(window.innerHeight);
    pageStore.setWindowInnerWidth(window.innerWidth);
    pageStore.setShowOnlyFloatingUploadForm(
      window.innerWidth < THRESHOLD_FLOATING_FORMS,
    );
    // Event listener
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
              <Route path="search/" element={<SearchPage />} />
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
