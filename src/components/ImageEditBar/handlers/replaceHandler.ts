import { postPicture } from "@helpers/picture/postPicture";
import { updateMediaLook } from "../updateMediaLook";
import { updateMediaItem } from "../updateMediaItem";
import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";

export const fileSelectHandler = async (
  event: React.ChangeEvent<HTMLInputElement>,
  page: "looks" | "items",
  selectedElement: any,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  setIsLoading(true);
  if (event.target.files && event.target.files[0]) {
    await replaceMediaHandler(
      event.target.files[0],
      page,
      selectedElement,
      setIsLoading,
    );
  }
};

const replaceMediaHandler = async (
  file: File,
  page: "looks" | "items",
  selectedElement: any,
  setIsLoading: (loading: boolean) => void,
): Promise<void> => {
  setIsLoading(true);
  try {
    const res = await postPicture(file, page);
    const mediaId = res.path;
    if (page === "looks") {
      await updateMediaLook(selectedElement.id, mediaId);
      looksStore.setIsOutOfDate(true);
    } else if (page === "items") {
      await updateMediaItem(selectedElement.id, mediaId);
      itemsStore.setIsOutOfDate(true);
    }
  } catch (e) {
    console.error(e);
  }
  setIsLoading(false);
};
