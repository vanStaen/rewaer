const userResolver = require("./resolvers/userResolver");
const lookResolver = require("./resolvers/lookResolver");
const itemResolver = require("./resolvers/itemResolver");

module.exports = {
  ...userResolver.userResolver,
  ...lookResolver.lookResolver,
  ...itemResolver.itemResolver,
};
