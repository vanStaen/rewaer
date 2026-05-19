import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";

export const restoreHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  if (
    !isLoading &&
    selectedElement.originalMediaId &&
    selectedElement.originalMediaId !== selectedElement.mediaId
  ) {
    setIsLoading(true);
    try {
      if (page === "looks") {
        await updateMediaLook(
          selectedElement.id,
          selectedElement.originalMediaId,
        );
        looksStore.setIsOutOfDate(true);
      } else if (page === "items") {
        await updateMediaItem(
          selectedElement.id,
          selectedElement.originalMediaId,
        );
        itemsStore.setIsOutOfDate(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
};
