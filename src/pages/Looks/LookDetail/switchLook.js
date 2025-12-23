import { looksStore } from "../looksStore.js";

export const switchLook = (next, showPrivate, selectedLookId) => {
  const indexOfResult = looksStore.looks
    .map(function (look) {
      return look.id;
    })
    .indexOf(selectedLookId);

  if (!showPrivate) {
    let nextLookId = indexOfResult;
    if (next) {
      do {
        if (indexOfResult === looksStore.looks.length - 1) {
          nextLookId = 0;
        } else {
          nextLookId = nextLookId + 1;
        }
      } while (looksStore.looks[nextLookId].private);
      looksStore.setSelectedLook(looksStore.looks[nextLookId]);
    } else {
      do {
        if (indexOfResult === 0) {
          nextLookId = looksStore.looks.length - 1;
        } else {
          nextLookId = nextLookId - 1;
        }
      } while (looksStore.looks[nextLookId].private);
      looksStore.setSelectedLook(looksStore.looks[nextLookId]);
    }
  } else {
    if (next) {
      if (indexOfResult === looksStore.looks.length - 1) {
        looksStore.setSelectedLook(looksStore.looks[0]);
      } else {
        looksStore.setSelectedLook(looksStore.looks[indexOfResult + 1]);
      }
    } else {
      if (indexOfResult === 0) {
        looksStore.setSelectedLook(
          looksStore.looks[looksStore.looks.length - 1],
        );
      } else {
        looksStore.setSelectedLook(looksStore.looks[indexOfResult - 1]);
      }
    }
  }
};
