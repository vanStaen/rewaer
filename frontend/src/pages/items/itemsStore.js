import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems";

export class ItemsStore {

  items = [];
  isLoading = true;
  isOutOfDate = true;
  error= null; 

  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action,
      isLoading: observable,
      setIsLoading: action,
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

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
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
      this.setItems(items);
      this.setIsLoading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const itemsStore = new ItemsStore();
