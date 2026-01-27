import { pictureFlip } from "../pictureFlip";
import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";

export const flipHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isMirror: boolean,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  if (!isLoading) {
    setIsLoading(true);
    try {
      if (page === "looks") {
        const mediaId = await pictureFlip(
          selectedElement.mediaId,
          page,
          isMirror,
        );
        await updateMediaLook(selectedElement.id, mediaId);
        looksStore.setIsOutOfDate(true);
      } else if (page === "items") {
        const mediaId = await pictureFlip(
          selectedElement.mediaId,
          page,
          isMirror,
        );
        await updateMediaItem(selectedElement.id, mediaId);
        itemsStore.setIsOutOfDate(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
};
