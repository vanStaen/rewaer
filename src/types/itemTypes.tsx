import { User } from "./userTypes";

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
  mediaId: string;
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
