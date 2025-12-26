import { action, makeObservable, observable } from "mobx";

import { fetchItems } from "./fetchItems";
import { userStore } from "@stores/userStore/userStore.js";
import { Item } from "@type/itemTypes";

export class ItemsStore {
  items: Item[] = [];
  isLoading: boolean = true;
  isOutOfDate: boolean = true;
  error: string | null = null;
  numberOfArchivedItem: number = 0;
  numberOfPrivateItem: number = 0;
  selectedItem: Item | null = null;
  originalScrollPosition: number | null = null;
  lastKnownScrollPosition: number | null = null;
  showPrivateItems: boolean = userStore.profilSettings?.displayPrivate;

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

  setItems = (items: Item[]): void => {
    this.items = items;
  };

  setIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  };

  setIsOutOfDate = (isOutOfDate: boolean): void => {
    this.isOutOfDate = isOutOfDate;
  };

  setNumberOfArchivedItem = (numberOfArchivedItem: number): void => {
    this.numberOfArchivedItem = parseInt(numberOfArchivedItem.toString());
  };

  setNumberOfPrivateItem = (numberOfPrivateItem: number): void => {
    this.numberOfPrivateItem = parseInt(numberOfPrivateItem.toString());
  };

  setError = (error: string | null): void => {
    this.error = error;
  };

  setShowPrivateItems = (showPrivateItems: boolean): void => {
    this.showPrivateItems = showPrivateItems;
  };

  setSelectedItem = (selectedItem: Item | null): void => {
    this.selectedItem = selectedItem;
  };

  setOriginalScrollPosition = (originalScrollPosition: number | null): void => {
    this.originalScrollPosition = originalScrollPosition;
  };

  setLastKnownScrollPosition = (
    lastKnownScrollPosition: number | null,
  ): void => {
    this.lastKnownScrollPosition = lastKnownScrollPosition;
  };

  loadItems = async (): Promise<void> => {
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
          (item) => item.id === this.selectedItem!.id,
        );
        this.setSelectedItem(udpateSelectedItem[0]);
      }
    } catch (error) {
      console.log((error as Error).message);
      this.setError((error as Error).message);
    }
  };
}

export const itemsStore = new ItemsStore();
