import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  infos = null;
  name = null;
  username = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      infos: observable,
      name: observable,
      username: observable,
      setEmail: action,
      setInfos: action,
      setName: action,
      setUsername: action,
      fetchuserData: action,
    });
  }

  setEmail = (email) => {
    this.email = email;
  };

  setInfos = (infos) => {
    this.infos = infos;
  };

  setName = (name) => {
    this.name = name;
  };

  setUsername = (username) => {
    this.username = username;
  };

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      userStore.setEmail(userData.email);
      userStore.setInfos(userData.infos);
      userStore.setName(userData.name);
      userStore.setUsername(userData.username);
    }
  };
}

export const userStore = new UserStore();
