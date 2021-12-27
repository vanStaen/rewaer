import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems";

export class ItemsStore {

  items = [];
  isLoading = true;
  isOutOfDate = true;
  error = null;
  numberOfArchivedItem = 0;
  numberOfPrivateItem = 0;

  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action,
      isLoading: observable,
      setIsLoading: action,
      isOutOfDate: observable,
      setIsOutOfDate: action,
      numberOfArchivedItem: observable,
      setNumberOfArchivedItem: action,
      numberOfPrivateItem: observable,
      setNumberOfPrivateItem: action,
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

  setNumberOfArchivedItem = (numberOfArchivedItem) => {
    this.numberOfArchivedItem = numberOfArchivedItem;
  };

  setNumberOfPrivateItem = (numberOfPrivateItem) => {
    this.numberOfPrivateItem = numberOfPrivateItem;
  };

  setError = (error) => {
    this.error = error;
  };

  loadItems = async () => {
    try {
      const items = await fetchItems();

      const archivedItems = items.filter(item => item.active === false);
      const privateItems = items.filter(item => item.private);

      this.setItems(items);
      this.setNumberOfArchivedItem(archivedItems.length);
      this.setNumberOfPrivateItem(privateItems.length);
      this.setIsLoading(false);
      this.setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const itemsStore = new ItemsStore();
