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
      isloading: observable,
      isOutOfDate: observable,
      setIsOutOfDate: action,
      error: observable,
      loadItems: action,
    });
  }

  setIsOutOfDate = (isOutOfDate) => {
    this.isOutOfDate = isOutOfDate;
  };

  loadItems = async () => {
    try {
      const items = await fetchItems();
      this.items = items;
      this.isloading = false;
      this.IsOutOfDate = false;
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }
  };
}

export const itemsStore = new ItemsStore();
