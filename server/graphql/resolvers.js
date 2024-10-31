import * as userResolver from "./resolvers/userResolver.js";
import * as lookResolver from "./resolvers/lookResolver.js";
import * as itemResolver from "./resolvers/itemResolver.js";

export default {
  ...userResolver.userResolver,
  ...lookResolver.lookResolver,
  ...itemResolver.itemResolver,
};
