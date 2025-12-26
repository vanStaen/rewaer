import { Item } from "@type/itemTypes";
import { Look } from "@type/lookTypes";

export interface ElementCardProps {
  element: Item | Look;
  type: "items" | "looks";
  showDetailView: (element: Item | Look) => void;
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
