import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./deleteLogout";
import { postLogin } from "./postLogin";
import { getHasAccess } from "./getHasAccess";
import { userStore } from "../userStore/userStore";


export class AuthStore {

  hasAccess = false;

  constructor() {
    makeObservable(this, {
      hasAccess: observable,
      setHasAccess: action,
      login: action,
      logout: action,
      checkAccess: action
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
      return resultLogIn.error
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

  checkAccess = async () => {
    const hasAccess = await getHasAccess();   
    this.setHasAccess(hasAccess);
   }
}

export const authStore = new AuthStore();
