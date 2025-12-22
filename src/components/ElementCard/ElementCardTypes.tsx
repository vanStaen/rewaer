import { Item } from "../../types/itemTypes";
import { Look } from "../../types/lookTypes";

export interface ElementCardProps {
  element: Item | Look;
  type: "items" | "looks";
  showDetailView: (element: Item) => void;
}

export interface ElementCardActionsProps {
  elementId: number | string;
  isActive: boolean;
  isFavorited: boolean;
  isPrivate: boolean;
  onFavoriteToggle: () => void;
  onPrivateToggle: () => void;
  onArchive: (value: boolean) => void;
  onDelete: () => void;
}
