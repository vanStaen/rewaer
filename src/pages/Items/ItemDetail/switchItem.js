import { itemsStore } from "../itemsStore.js";

export const switchItem = (next, showPrivate) => {
  const indexOfResult = itemsStore.items
    .map(function (look) {
      return look.id;
    })
    .indexOf(itemsStore.selectedItem.id);

  if (!showPrivate) {
    let nextLookId = indexOfResult;
    if (next) {
      do {
        if (indexOfResult === itemsStore.items.length - 1) {
          nextLookId = 0;
        } else {
          nextLookId = nextLookId + 1;
        }
      } while (itemsStore.items[nextLookId].private);
      itemsStore.setSelectedItem(itemsStore.items[nextLookId]);
    } else {
      do {
        if (indexOfResult === 0) {
          nextLookId = itemsStore.items.length - 1;
        } else {
          nextLookId = nextLookId - 1;
        }
      } while (itemsStore.items[nextLookId].private);
      itemsStore.setSelectedItem(itemsStore.items[nextLookId]);
    }
  } else {
    if (next) {
      if (indexOfResult === itemsStore.items.length - 1) {
        itemsStore.setSelectedItem(itemsStore.items[0]);
      } else {
        itemsStore.setSelectedItem(itemsStore.items[indexOfResult + 1]);
      }
    } else {
      if (indexOfResult === 0) {
        itemsStore.setSelectedItem(
          itemsStore.items[itemsStore.items.length - 1]
        );
      } else {
        itemsStore.setSelectedItem(itemsStore.items[indexOfResult - 1]);
      }
    }
  }
};