const userResolver = require("./resolvers/user");
const lookResolver = require("./resolvers/look");
const itemResolver = require("./resolvers/item");

module.exports = {
  ...userResolver.User,
  ...lookResolver.Look,
  ...itemResolver.Item,
};
