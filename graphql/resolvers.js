const userResolver = require("./resolvers/user");
const lookResolver = require("./resolvers/look");
const itemResolver = require("./resolvers/item");
const dummyResolver = require("./resolvers/dummy");

module.exports = {
  ...userResolver.User,
  ...lookResolver.Look,
  ...itemResolver.Item,
  ...dummyResolver.Dummy,
};
