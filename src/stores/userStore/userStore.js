import { action, makeObservable, observable } from "mobx";

import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";
import { getUserInfo } from "./getUserInfo";
import { getPending } from "./getPending";
import { updateSettings } from "../../pages/Profile/EditSettings/updateSettings";

export class UserStore {
  isLoading = true;
  error = null;
  _id = null;
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
  friendsPending = [];
  followers = [];
  followed = [];
  lastActive = null;
  archived = null;
  usernameChange = null;
  menuSelected = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      _id: observable,
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
      friendsPending: observable,
      lastActive: observable,
      archived: observable,
      usernameChange: observable,
      menuSelected: observable,
      setIsLoading: action,
      setError: action,
      set_id: action,
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
      setFriendsPending: action,
      setFollowers: action,
      setFollowed: action,
      setLastActive: action,
      setArchived: action,
      setUsernameChange: action,
      setMenuSelected: action,
      fetchUserData: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setError = (error) => {
    this.error = error;
  };

  set_id = (_id) => {
    this._id = _id;
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

  setFriendsPending = (friendsPending) => {
    this.friendsPending = friendsPending;
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

  setMenuSelected = (menuSelected) => {
    this.menuSelected = menuSelected;
  };

  setFollowers = (followers) => {
    this.followers = followers;
  };

  setFollowed = (followed) => {
    this.followed = followed;
  };

  fetchUserData = async (loader = true) => {
    try {
      if (loader) {
        this.setIsLoading(true)
      };
      const userData = await getUserInfo();
      const pendingData = await getPending();
      if (userData && pendingData) {
        const friendsNotPending = userData.friends.filter((friend) => {
          const isPending = pendingData.findIndex(pending => pending.friend_id === parseInt(friend._id));
          if (isPending === -1) { return true }
          return false;
        })
        this.set_id(parseInt(userData._id));
        this.setEmail(userData.email);
        this.setUserName(userData.userName);
        this.setAvatar(userData.avatar);
        this.setFirstName(userData.firstName);
        this.setLastName(userData.lastName);
        this.setFriends(friendsNotPending);
        this.setFriendsPending(pendingData);
        this.setFollowers(userData.followers);
        this.setFollowed(userData.followed);
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
      this.setError(null);
    } catch (error) {
      this.setError(error);
    }
  };
}

export const userStore = new UserStore();
