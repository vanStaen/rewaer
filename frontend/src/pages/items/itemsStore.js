import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems";

export class ItemsStore {

  items = [];
  isloading = true;
  isOutOfDate = true;
  error= null; 

  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action,
      isloading: observable,
      setIsloading: action,
      isOutOfDate: observable,
      setIsOutOfDate: action,
      error: observable,
      setError: action,
      loadItems: action,
    });
  }

  setItems = (items) => {
    this.items = items;
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

  loadItems = async () => {
    try {
      const items = await fetchItems();
      console.log("items", items);
      this.setItems(items);
      this.setIsloading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const itemsStore = new ItemsStore();
