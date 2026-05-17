import { notification } from "antd";
import { pictureCrop } from "../pictureCrop";
import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";
import {
  getCurrentMediaId,
  getOriginalMediaId,
} from "@helpers/picture/mediaId";

export const cropHandler = async (
  page: "looks" | "items",
  selectedElement: any,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
  t: (key: string) => string,
): Promise<void> => {
  if (!isLoading) {
    setIsLoading(true);
    try {
      // Hardcoded crop values
      const left = 50;
      const top = 50;
      const width = 400;
      const height = 300;

      if (page === "looks") {
        const mediaId = await pictureCrop(
          getCurrentMediaId(selectedElement.mediaId),
          page,
          left,
          top,
          width,
          height,
          getOriginalMediaId(selectedElement.mediaId),
        );
        await updateMediaLook(selectedElement.id, {
          mediaId,
          originalMediaId: getOriginalMediaId(selectedElement.mediaId),
        });
        looksStore.setIsOutOfDate(true);
        notification.success({
          message: t("main.success"),
          description: t("main.imageCropped"),
          placement: "bottomRight",
        });
      } else if (page === "items") {
        const mediaId = await pictureCrop(
          getCurrentMediaId(selectedElement.mediaId),
          page,
          left,
          top,
          width,
          height,
          getOriginalMediaId(selectedElement.mediaId),
        );
        await updateMediaItem(selectedElement.id, {
          mediaId,
          originalMediaId: getOriginalMediaId(selectedElement.mediaId),
        });
        itemsStore.setIsOutOfDate(true);
        notification.success({
          message: t("main.success"),
          description: t("main.imageCropped"),
          placement: "bottomRight",
        });
      }
    } catch (e) {
      notification.error({
        message: t("main.error"),
        description: t("main.errorCroppingImage"),
        placement: "bottomRight",
      });
      console.error(e);
    }
    setIsLoading(false);
  }
};
