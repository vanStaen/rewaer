import { action, makeObservable, observable } from "mobx";

import { fetchLooks } from "./fetchLooks";
import { userStore } from "../../stores/userStore/userStore";

export class LooksStore {
  looks = [];
  isLoading = true;
  isOutOfDate = true;
  error = null;
  numberOfArchivedLook = 0;
  numberOfPrivateLook = 0;
  selectedLook = null;
  originalScrollPosition = null;
  lastKnownScrollPosition = null;
  showPrivate = userStore.profilSettings?.displayPrivate;

  constructor() {
    makeObservable(this, {
      looks: observable,
      setLooks: action,
      isLoading: observable,
      setIsLoading: action,
      isOutOfDate: observable,
      setIsOutOfDate: action,
      numberOfArchivedLook: observable,
      setNumberOfArchivedLook: action,
      numberOfPrivateLook: observable,
      setNumberOfPrivateLook: action,
      showPrivate: observable,
      setShowPrivate: action,
      selectedLook: observable,
      setSelectedLook: action,
      originalScrollPosition : observable,
      setOriginalScrollPosition: action,
      lastKnownScrollPosition: observable,
      setLastKnownScrollPosition: action,
      error: observable,
      setError: action,
      loadLooks: action,
    });
  }

  setLooks = (looks) => {
    this.looks = looks;
  };

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setIsOutOfDate = (isOutOfDate) => {
    this.isOutOfDate = isOutOfDate;
  };

  setNumberOfArchivedLook = (numberOfArchivedLook) => {
    this.numberOfArchivedLook = parseInt(numberOfArchivedLook);
  };

  setNumberOfPrivateLook = (numberOfPrivateLook) => {
    this.numberOfPrivateLook = parseInt(numberOfPrivateLook);
  };

  setError = (error) => {
    this.error = error;
  };

  setShowPrivate = (showPrivate) => {
    this.showPrivate = showPrivate;
  };

  setSelectedLook = (selectedLook) => {
    this.selectedLook = selectedLook;
  };

  setOriginalScrollPosition= (originalScrollPosition) => { 
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition= (lastKnownScrollPosition) => {
    this.lastKnownScrollPosition = lastKnownScrollPosition;
  };

  loadLooks = async () => {
    try {
      const looks = await fetchLooks();

      const archivedLooks = looks.filter((look) => look.active === false);
      const privateLooks = looks.filter((look) => look.private);

      this.setLooks(looks);
      this.setNumberOfArchivedLook(archivedLooks.length);
      this.setNumberOfPrivateLook(privateLooks.length);
      this.setIsLoading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const looksStore = new LooksStore();
