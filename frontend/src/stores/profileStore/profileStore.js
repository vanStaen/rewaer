import { action, makeObservable, observable } from "mobx";

import { getProfileInfo } from "./getProfileInfo";

export class ProfileStore {
  isLoading = true;
  error = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  gender = null;
  friends = null;
  items = null;
  looks = null;
  lastActive = null;
  profilSettings = null;
  filterIsPopingUp = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      userName: observable,
      avatar: observable,
      firstName: observable,
      lastName: observable,
      gender: observable,
      friends: observable,
      lastActive: observable,
      profilSettings: observable,
      items: observable,
      looks: observable,
      filterIsPopingUp: observable,
      setIsLoading: action,
      setError: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setLastName: action,
      setGender: action,
      setFriends: action,
      setLastActive: action,
      setProfilSettings: action,
      setLooks: action,
      setItems: action,
      setFilterIsPopingUp: action,
      fetchProfileData: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setError = (error) => {
    this.error = error;
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

  setGender = (gender) => {
    this.gender = gender;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  setItems = (items) => {
    this.items = items;
  };

  setFilterIsPopingUp = (filterIsPopingUp) => {
    this.filterIsPopingUp = filterIsPopingUp;
  };

  setLooks = (looks) => {
    this.looks = looks;
  };


  fetchProfileData = async (userName) => {
    try {
      this.setIsLoading(true);
      if (userName) {
        this.setUserName(userName);
        const profileData = await getProfileInfo(userName);
        if (profileData) {
          this.setAvatar(profileData.avatar);
          this.setFirstName(profileData.firstName);
          this.setLastName(profileData.lastName);
          this.setFriends(profileData.friends);
          this.setGender(profileData.gender);
          this.setLooks(profileData.looks);
          this.setItems(profileData.items);
          this.setLastActive(profileData.lastActive);
          this.setProfilSettings(JSON.parse(profileData.profilSettings));
        }
        this.setIsLoading(false);
      }
    } catch (error) {
      this.setError(error);
    }
  };
}

export const profileStore = new ProfileStore();
