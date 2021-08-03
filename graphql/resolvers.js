const userResolver = require("./resolvers/userResolver");
const lookResolver = require("./resolvers/lookResolver");
const itemResolver = require("./resolvers/itemResolver");

module.exports = {
  ...userResolver.User,
  ...lookResolver.Look,
  ...itemResolver.Item,
};
