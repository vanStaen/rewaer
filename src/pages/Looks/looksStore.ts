import { action, makeObservable, observable } from "mobx";

import { fetchLooks } from "./fetchLooks";
import { userStore } from "@stores/userStore/userStore.js";
import { Look } from "@type/lookTypes";

export class LooksStore {
  looks: Look[] = [];
  isLoading: boolean = true;
  isOutOfDate: boolean = true;
  error: string | null = null;
  numberOfArchivedLook: number = 0;
  numberOfPrivateLook: number = 0;
  selectedLook: Look | null = null;
  originalScrollPosition: number = 0;
  lastKnownScrollPosition: number = 0;
  showPrivateLooks: boolean = userStore.profilSettings?.displayPrivate;

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

  setLooks = (looks: Look[]): void => {
    this.looks = looks;
  };

  setIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  };

  setIsOutOfDate = (isOutOfDate: boolean): void => {
    this.isOutOfDate = isOutOfDate;
  };

  setNumberOfArchivedLook = (numberOfArchivedLook: number): void => {
    this.numberOfArchivedLook = parseInt(numberOfArchivedLook.toString());
  };

  setNumberOfPrivateLook = (numberOfPrivateLook: number): void => {
    this.numberOfPrivateLook = parseInt(numberOfPrivateLook.toString());
  };

  setError = (error: string | null): void => {
    this.error = error;
  };

  setShowPrivateLooks = (showPrivateLooks: boolean): void => {
    this.showPrivateLooks = showPrivateLooks;
  };

  setSelectedLook = (selectedLook: Look | null): void => {
    this.selectedLook = selectedLook;
  };

  setOriginalScrollPosition = (originalScrollPosition: number): void => {
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition = (lastKnownScrollPosition: number): void => {
    this.lastKnownScrollPosition = lastKnownScrollPosition;
  };

  loadLooks = async (): Promise<void> => {
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
          (look) => look.id === this.selectedLook!.id,
        );
        this.setSelectedLook(udpateSelectedLook[0]);
      }
    } catch (error) {
      console.log((error as Error).message);
      this.setError((error as Error).message);
    }
  };
}

export const looksStore = new LooksStore();
