import { User } from "./userTypes";
import { Item } from "./itemTypes";
import { MediaIdValue } from "@helpers/picture/mediaId";

export interface Look {
  id: number | string;
  title: string;
  category: string | null;
  season?: string;
  active: boolean;
  favorite: boolean;
  private: boolean;
  mediaId: MediaIdValue | string;
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
  mediaId?: MediaIdValue | string;
  private?: boolean;
  items?: number[];
}

export interface getLooksGraphQLResponse {
  data: {
    getLooks: Look[];
  };
}
