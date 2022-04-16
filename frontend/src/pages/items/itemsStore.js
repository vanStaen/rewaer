import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems";
import { userStore } from "../../stores/userStore/userStore";

export class ItemsStore {
  items = [];
  isLoading = true;
  isOutOfDate = true;
  error = null;
  numberOfArchivedItem = 0;
  numberOfPrivateItem = 0;
  selectedItemId = null;
  originalScrollPosition = null;
  lastKnownScrollPosition = null;
  showPrivate = userStore.profilSettings?.displayPrivate;

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
      showPrivate: observable,
      setShowPrivate: action,
      error: observable,
      setError: action,
      selectedItemId: observable,
      setSelectedItemId: action,
      originalScrollPosition : observable,
      setOriginalScrollPosition: action,
      lastKnownScrollPosition: observable,
      setLastKnownScrollPosition: action,
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
    this.numberOfArchivedItem = parseInt(numberOfArchivedItem);
  };

  setNumberOfPrivateItem = (numberOfPrivateItem) => {
    this.numberOfPrivateItem = parseInt(numberOfPrivateItem);
  };

  setError = (error) => {
    this.error = error;
  };

  setShowPrivate = (showPrivate) => {
    this.showPrivate = showPrivate;
  };

  setSelectedItemId = (selectedItemId) => {
    this.selectedItemId = selectedItemId;
  };

  setOriginalScrollPosition= (originalScrollPosition) => {
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition= (lastKnownScrollPosition) => {
    this.lastKnownScrollPosition = lastKnownScrollPosition;
  };

  loadItems = async () => {
    try {
      const items = await fetchItems();

      const archivedItems = items.filter((item) => item.active === false);
      const privateItems = items.filter((item) => item.private);

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
