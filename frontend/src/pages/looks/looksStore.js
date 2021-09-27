import { action, makeObservable, observable } from "mobx";

import { fetchLooks } from "./fetchLooks";

export class LooksStore {

  looks = [];
  isloading = true;
  isOutOfDate = true;
  error= null; 

  constructor() {
    makeObservable(this, {
      looks: observable,
      setLooks: action,
      isloading: observable,
      setIsloading: action,
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

  setIsloading = (isloading) => {
    this.isloading = isloading;
  };

  setIsOutOfDate = (isOutOfDate) => {
    this.isOutOfDate = isOutOfDate;
  };

  setError = (error) => {
    this.error = error;
  };

  /* mobx store
  @action
  loadLooks(){ 
    loadlooks() 
    set hier the looks
    // await -> run_in_action  
  }
  */

  loadLooks = async () => {
    try {
      const looks = await fetchLooks();
      this.setLooks(looks);
      this.setIsloading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const looksStore = new LooksStore();
