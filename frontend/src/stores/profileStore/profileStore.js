import { action, makeObservable, observable } from "mobx";
import { getProfileInfo } from "./getProfileInfo";

export class ProfileStore {
  isLoading = true;
  error = null;
  userName = null;
  avatar = null;
  firstName = null;
  gender = null;
  friends = [];
  lastActive = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      userName: observable,
      avatar: observable,
      firstName: observable,
      gender: observable,
      friends: observable,
      lastActive: observable,
      setIsLoading: action,
      setError: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setGender: action,
      setFriends: action,
      setLastActive: action,
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

  setGender = (gender) => {
    this.gender = gender;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  fetchProfileData = async (username) => {
    try {
      const profileData = await getProfileInfo(username);
      if (profileData) {
        this.setUserName(userName);
        this.setAvatar(profileData.avatar);
        this.setFirstName(profileData.firstName);
        this.setFriends(profileData.friends);
        this.setLastActive(profileData.lastActive);
      }
      this.setIsLoading(false);
    } catch (error) {
      this.setError(error);
    }
  };
}

export const profileStore = new ProfileStore();
