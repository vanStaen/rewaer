const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");
const lookSchemas = require("./schemas/look");
const itemSchemas = require("./schemas/item");
const itemDummy = require("./schemas/dummy");

module.exports = buildSchema(`

    ${userSchemas.User}    
    ${lookSchemas.Look}
    ${itemSchemas.Item}
    ${itemDummy.Dummy}

    ${userSchemas.AuthData}
    
    ${userSchemas.UserInputData}
    ${lookSchemas.LookInputData}
    ${itemSchemas.ItemInputData} 

    type RootQuery {
        ${lookSchemas.LookQueries}
        ${itemSchemas.ItemQueries}
        ${userSchemas.UserQueries}
        ${itemDummy.DummyQueries}
    }

    type RootMutations {
        ${userSchemas.UserMutations}
        ${lookSchemas.LookMutations}
        ${itemSchemas.ItemMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);
