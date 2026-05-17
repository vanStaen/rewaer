import { User } from "./userTypes";
import { MediaIdValue } from "@helpers/picture/mediaId";

export interface Item {
  id: number | string;
  title: string;
  brand: string | null;
  category: string | null;
  colors: string[];
  pattern: string | null;
  active: boolean;
  favorite: boolean;
  private: boolean;
  mediaId: MediaIdValue | string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  user: User;
  size: string | null;
}

export interface getItemsGraphQLResponse {
  data: {
    getItems: Item[];
  };
}

export interface ItemInput {
  title?: string;
  mediaId?: MediaIdValue | string;
  category?: string;
  notes?: string;
  location?: string;
  size?: string;
  colors?: string[];
  pattern?: string;
  brand?: string;
  active?: boolean;
  status?: string;
  favorite?: boolean;
  private?: boolean;
  sharedWith?: number[];
  likes?: number[];
  dislikes?: number[];
}
