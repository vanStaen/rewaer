import { notification } from "antd";
import { pictureAutoCorrect } from "../pictureAutoCorrect";
import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";

export const autoCorrectHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
  t: (key: string) => string,
): Promise<void> => {
  if (!isLoading) {
    setIsLoading(true);
    try {
      const mediaId = await pictureAutoCorrect(selectedElement.mediaId, page);
      if (page === "looks") {
        await updateMediaLook(selectedElement.id, mediaId);
        looksStore.setIsOutOfDate(true);
      } else if (page === "items") {
        await updateMediaItem(selectedElement.id, mediaId);
        itemsStore.setIsOutOfDate(true);
      }
      notification.success({
        message: t("main.success"),
        description: t("main.imageAutoCorrected"),
        placement: "bottomRight",
      });
    } catch (e) {
      notification.error({
        message: t("main.error"),
        description: t("main.errorAutoCorrectingImage"),
        placement: "bottomRight",
      });
      console.error(e);
    }
    setIsLoading(false);
  }
};
