import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";
import {
  getCurrentMediaId,
  getOriginalMediaId,
} from "@helpers/picture/mediaId";

export const restoreHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  if (!isLoading) {
    setIsLoading(true);
    try {
      const originalMediaId = getOriginalMediaId(selectedElement.mediaId);
      const currentMediaId = getCurrentMediaId(selectedElement.mediaId);
      if (originalMediaId && originalMediaId !== currentMediaId) {
        const mediaId = {
          mediaId: originalMediaId,
          originalMediaId,
        };
        if (page === "looks") {
          await updateMediaLook(selectedElement.id, mediaId);
          looksStore.setIsOutOfDate(true);
        } else if (page === "items") {
          await updateMediaItem(selectedElement.id, mediaId);
          itemsStore.setIsOutOfDate(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
};
