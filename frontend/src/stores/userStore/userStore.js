import { action, makeObservable, observable } from "mobx";

import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";
import { getUserInfo } from "./getUserInfo";
import { updateSettings } from "../../pages/Profile/EditSettings/updateSettings";

export class UserStore {
  isLoading = true;
  error = null;
  email = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  emailSettings = null;
  profilSettings = null;
  language = null;
  gender = null;
  friends = [];
  lastActive = null;
  archived = null; 
  usernameChange= null; 

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      email: observable,
      userName: observable,
      avatar: observable,
      firstName: observable,
      lastName: observable,
      emailSettings: observable,
      profilSettings: observable,
      language: observable,
      gender: observable,
      friends: observable,
      lastActive: observable,
      archived: observable,
      usernameChange: observable,
      setIsLoading: action,
      setError: action,
      setEmail: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setLastName: action,
      setEmailSettings: action,
      setProfilSettings: action,
      setLanguage: action,
      setGender: action,
      setFriends: action,
      setLastActive: action,
      setArchived: action,
      setUsernameChange: action,
      fetchuserData: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setError = (error) => {
    this.error = error;
  };

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

  setLanguage = (language) => {
    this.language = language;
  };

  setGender = (gender) => {
    this.gender = gender;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  setArchived = (archived) => {
    this.archived = archived;
  };

  setUsernameChange = (usernameChange) => {
    this.usernameChange = usernameChange;
  };

  fetchuserData = async () => {
    try {

      const userData = await getUserInfo();

      if (userData) {
        this.setEmail(userData.email);
        this.setUserName(userData.userName);
        this.setAvatar(userData.avatar);
        this.setFirstName(userData.firstName);
        this.setLastName(userData.lastName);
        this.setFriends(userData.friends);
        this.setLastActive(userData.lastActive);
        this.setLanguage(userData.language);
        this.setGender(userData.gender);
        this.setUsernameChange(userData.usernameChange);
        this.setArchived(userData.archived);

        if (userData.profilSettings === "{}" || userData.emailSettings === "{}") {
          this.setEmailSettings(defaultEmailSettings);
          this.setProfilSettings(defaultProfilSettings);
          updateSettings(defaultEmailSettings, defaultProfilSettings);
        } else {
          this.setEmailSettings(JSON.parse(userData.emailSettings));
          this.setProfilSettings(JSON.parse(userData.profilSettings));
        }
      }
      this.setIsLoading(false);
    } catch (error) {
      this.setError(error);
    }
  };
}

export const userStore = new UserStore();
