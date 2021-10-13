import { action, makeObservable, observable } from "mobx";

import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";
import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  emailSettings = null;
  profilSettings = null;
  friends = [];
  lastActive = null; 

  constructor() {
    makeObservable(this, {
      email: observable,
      userName: observable,
      avatar: observable,
      firstName: observable,
      lastName: observable,
      emailSettings: observable,
      profilSettings: observable,
      friends: observable,
      lastActive: observable,
      setEmail: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setLastName: action,
      setEmailSettings: action,
      setProfilSettings: action,
      setFriends: action,
      setLastActive: action,
      fetchuserData: action,
    });
  }

  setEmail = (email) => {
    this.email = email;
  };

  setUserName = (userName) => {
    this.userName = userName;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setFirstName = (firstName) => {
    this.firstName = firstName;
  };

  setLastName = (lastName) => {
    this.lastName = lastName;
  };

  setEmailSettings = (emailSettings) => {
    this.emailSettings = emailSettings;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive
  }

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      this.setEmail(userData.email);
      this.setUserName(userData.userName);
      this.setAvatar(userData.avatar);
      this.setFirstName(userData.firstName);
      this.setLastName(userData.lastName);
      this.setFriends(userData.friends);
      this.setLastActive(userData.lastActive);

      if (userData.emailSettings === null || userData.emailSettings === "{}") {
        this.setEmailSettings(defaultEmailSettings);
      } else {
        this.setEmailSettings(JSON.parse(userData.emailSettings));
      }

      if (userData.profilSettings === null || userData.profilSettings === "{}") {
        this.setProfilSettings(defaultProfilSettings);
      } else {
        this.setProfilSettings(JSON.parse(userData.profilSettings));
      }

    }
  };
}

export const userStore = new UserStore();
