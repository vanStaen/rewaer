import { action, makeObservable, observable } from "mobx";

import { fetchLooks } from "./fetchLooks";

export class LooksStore {

  looks = [];
  isLoading = true;
  isOutOfDate = true;
  error= null; 

  constructor() {
    makeObservable(this, {
      looks: observable,
      setLooks: action,
      isLoading: observable,
      setIsLoading: action,
      isOutOfDate: observable,
      setIsOutOfDate: action,
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

  setError = (error) => {
    this.error = error;
  };

  loadLooks = async () => {
    try {
      const looks = await fetchLooks();
      this.setLooks(looks);
      this.setIsLoading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const looksStore = new LooksStore();
