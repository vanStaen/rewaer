import { pictureRotate } from "../pictureRotate";
import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";

export const rotateHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  if (!isLoading) {
    setIsLoading(true);
    try {
      if (page === "looks") {
        const mediaId = await pictureRotate(selectedElement.mediaId, page, 1);
        await updateMediaLook(selectedElement.id, mediaId);
        looksStore.setIsOutOfDate(true);
      } else if (page === "items") {
        const mediaId = await pictureRotate(selectedElement.mediaId, page, 1);
        await updateMediaItem(selectedElement.id, mediaId);
        itemsStore.setIsOutOfDate(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
};
