/* const graphqlResolver: {
    createUser: ({ userInput}: {
        userInput: any;
    }, req: any) => Promise<any>;
} */

const userResolver = require(".resolvers/user");
const lookResolver = require(".resolvers/look");
const itemResolver = require(".resolvers/item");

module.exports = {
  ...userResolver,
  ...lookResolver,
  ...itemResolver,
};
