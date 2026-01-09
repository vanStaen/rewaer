import { User } from "./userTypes";
import { Item } from "./itemTypes";

export interface Look {
  id: number | string;
  title: string;
  category: string | null;
  season?: string;
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

export interface LookInput {
  title?: string;
  category?: string | null;
  season?: string;
  mediaId?: string;
  private?: boolean;
  items?: number[];
}

export interface getLooksGraphQLResponse {
  data: {
    getLooks: Look[];
  };
}
