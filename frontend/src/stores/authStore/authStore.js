import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./deleteLogout";
import { postLogin } from "./postLogin";
import { getHasAccess } from "./getHasAccess";


export class AuthStore {

  hasAccess = false;

  constructor() {
    makeObservable(this, {
      hasAccess: observable,
      login: action,
      logout: action,
      setHasAccess: action,
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
      this.hasAccess = true;
    } else {
      return resultLogIn.error
    }
  };

  logout = async () => {
    // Call logout endpoint
    const resultLogOut = await deleteLogout();
    if (resultLogOut) {
      this.hasAccess = false;
    }
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };

  checkAccess = async () => {
    const hasAccess = await getHasAccess();   
    console.log("hasAccess", hasAccess);
    this.hasAccess = hasAccess;
   }
}

export const authStore = new AuthStore();
