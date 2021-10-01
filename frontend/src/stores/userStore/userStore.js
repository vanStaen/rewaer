import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  infos = null;
  name = null;
  username = null;
  avatar = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      infos: observable,
      name: observable,
      username: observable,
      avatar: observable,
      setEmail: action,
      setInfos: action,
      setName: action,
      setUsername: action,
      setAvatar: action,
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

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };


  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      this.setEmail(userData.email);
      this.setInfos(userData.infos);
      this.setName(userData.firstName);
      this.setUsername(userData.username);
      this.setAvatar(userData.avatar);
    }
  };
}

export const userStore = new UserStore();
