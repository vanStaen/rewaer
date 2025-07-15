import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems.js";
import { userStore } from "../../stores/userStore/userStore.js";

export class ItemsStore {
  items = [];
  isLoading = true;
  isOutOfDate = true;
  error = null;
  numberOfArchivedItem = 0;
  numberOfPrivateItem = 0;
  selectedItem = null;
  originalScrollPosition = null;
  lastKnownScrollPosition = null;
  showPrivateItems = userStore.profilSettings?.displayPrivate;

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
      showPrivateItems: observable,
      setShowPrivateItems: action,
      error: observable,
      setError: action,
      selectedItem: observable,
      setSelectedItem: action,
      originalScrollPosition: observable,
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

  setShowPrivateItems = (showPrivateItems) => {
    this.showPrivateItems = showPrivateItems;
  };

  setSelectedItem = (selectedItem) => {
    this.selectedItem = selectedItem;
  };

  setOriginalScrollPosition = (originalScrollPosition) => {
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition = (lastKnownScrollPosition) => {
    this.lastKnownScrollPosition = lastKnownScrollPosition;
  };

  loadItems = async () => {
    try {
      const items = await fetchItems();
      const archivedItems = items.filter((item) => item?.active === false);
      const privateItems = items.filter((item) => item?.private);
      this.setItems(items);
      this.setNumberOfArchivedItem(archivedItems.length);
      this.setNumberOfPrivateItem(privateItems.length);
      this.setIsLoading(false);
      this.setIsOutOfDate(false);
      if (this.selectedItem) {
        const udpateSelectedItem = items.filter(
          (item) => item.id === this.selectedItem.id,
        );
        this.setSelectedItem(udpateSelectedItem[0]);
      }
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  };
}

export const itemsStore = new ItemsStore();
