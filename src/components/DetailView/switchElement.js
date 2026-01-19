import { itemsStore } from "@pages/Items/itemsStore.ts";
import { looksStore } from "@pages/Looks/looksStore.ts";

const getStoreConfig = (page) => {
  const configs = {
    items: {
      items: itemsStore.items,
      selectedItem: itemsStore.selectedItem,
      setSelectedItem: (item) => itemsStore.setSelectedItem(item),
    },
    looks: {
      items: looksStore.looks,
      selectedItem: looksStore.selectedLook,
      setSelectedItem: (look) => looksStore.setSelectedLook(look),
    },
  };
  return configs[page];
};

const getNextIndex = (currentIndex, length, next) => {
  if (next) {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  }
  return currentIndex === 0 ? length - 1 : currentIndex - 1;
};

const getNextVisibleIndex = (currentIndex, items, next) => {
  let nextIndex = currentIndex;
  do {
    nextIndex = getNextIndex(nextIndex, items.length, next);
  } while (items[nextIndex].private);
  return nextIndex;
};

export const switchElement = (next, showPrivate, page) => {
  const store = getStoreConfig(page);
  const currentIndex = store.items
    .map((item) => item.id)
    .indexOf(store.selectedItem.id);

  const nextIndex = showPrivate
    ? getNextIndex(currentIndex, store.items.length, next)
    : getNextVisibleIndex(currentIndex, store.items, next);

  store.setSelectedItem(store.items[nextIndex]);
};
