import { User } from "./userTypes";
import { Item } from "./itemTypes";

export interface Look {
  id: number | string;
  title: string;
  brand: string | null;
  category: string | null;
  colors: string[];
  pattern: string | null;
  active: boolean;
  favorite: boolean;
  private: boolean;
  mediaId: string;
  mediaIdMedium: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  user: User;
  items?: Item[];
}

