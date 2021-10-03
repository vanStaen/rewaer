import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  emailSettings = [];
  profilSettings = [];
  friends = [];

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
      setEmail: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setLastName: action,
      setEmailSettings: action,
      setProfilSettings: action,
      setFriends: action,
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

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      this.setEmail(userData.email);
      this.setUserName(userData.userName);
      this.setAvatar(userData.avatar);
      this.setFirstName(userData.firstName);
      this.setLastName(userData.lastName);
      this.setEmailSettings(userData.emailSettings);
      this.setProfilSettings(userData.profilSettings);
      this.setFriends(userData.friends);
    }
  };
}

export const userStore = new UserStore();
