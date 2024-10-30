import { action, makeObservable, observable } from "mobx";

import { fetchLooks } from "./fetchLooks.js";
import { userStore } from "../../stores/userStore/userStore.js";

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
  showPrivateLooks = userStore.profilSettings?.displayPrivate;

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
      showPrivateLooks: observable,
      setShowPrivateLooks: action,
      selectedLook: observable,
      setSelectedLook: action,
      originalScrollPosition: observable,
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

  setShowPrivateLooks = (showPrivateLooks) => {
    this.showPrivateLooks = showPrivateLooks;
  };

  setSelectedLook = (selectedLook) => {
    this.selectedLook = selectedLook;
  };

  setOriginalScrollPosition = (originalScrollPosition) => {
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition = (lastKnownScrollPosition) => {
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
      if (this.selectedLook) {
        const udpateSelectedLook = looks.filter(
          (look) => look._id === this.selectedLook._id
        );
        this.setSelectedLook(udpateSelectedLook[0]);
      }
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const looksStore = new LooksStore();
