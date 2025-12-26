import { User } from "./userTypes";
import { Item } from "./itemTypes";

export interface Look {
  id: number | string;
  title: string;
  brand?: string | null;
  category: string | null;
  season?: string;
  colors?: string[];
  pattern?: string | null;
  active: boolean;
  favorite: boolean;
  private: boolean;
  mediaId: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  user: User;
  items?: Item[];
}

export interface getLooksGraphQLResponse {
  data: {
    getLooks: Look[];
  };
}
