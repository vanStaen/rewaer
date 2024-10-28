import { userResolver } from "./resolvers/userResolver.js";
import { lookResolver } from "./resolvers/lookResolver.js";
import { itemResolver } from "./resolvers/itemResolver.js";

export default {
  ...userResolver.userResolver,
  ...lookResolver.lookResolver,
  ...itemResolver.itemResolver,
};
