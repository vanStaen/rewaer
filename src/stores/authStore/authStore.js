import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./deleteLogout.js";
import { postLogin } from "./postLogin.js";
import { getHasAccess } from "./getHasAccess.js";
import { userStore } from "../userStore/userStore.js";

export class AuthStore {
  hasAccess = false;
  isCheckingAccess = true;

  constructor() {
    makeObservable(this, {
      hasAccess: observable,
      setHasAccess: action,
      isCheckingAccess: observable,
      setIsCheckingAccess: action,
      login: action,
      logout: action,
      checkAccess: action,
    });
  }

  login = async (email, username, password, remind) => {
    if (!remind) {
      remind = false;
    }
    // Call login endpoint
    const resultLogIn = await postLogin(email, username, password, remind);
    if (resultLogIn.success) {
      this.setHasAccess(true);
    } else {
      return resultLogIn.error;
    }
  };

  logout = async () => {
    // Call logout endpoint
    const resultLogOut = await deleteLogout();
    if (resultLogOut) {
      this.setHasAccess(false);
      userStore.setEmail(null);
      userStore.setUserName(null);
      userStore.setAvatar(null);
      userStore.setFirstName(null);
      userStore.setLastName(null);
      userStore.setEmailSettings(null);
      userStore.setProfilSettings(null);
      userStore.setLanguage(null);
      userStore.setGender(null);
      userStore.setFriends([]);
      userStore.setLastActive(null);
    }
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };

  setIsCheckingAccess = (isCheckingAccess) => {
    this.isCheckingAccess = isCheckingAccess;
  };

  checkAccess = async () => {
    this.setIsCheckingAccess(true);
    const hasAccess = await getHasAccess();
    // console.log("Check if user has valid credentials.")
    this.setHasAccess(hasAccess);
    this.setIsCheckingAccess(false);
  };
}

export const authStore = new AuthStore();
