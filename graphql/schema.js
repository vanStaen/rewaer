const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");
const lookSchemas = require("./schemas/look");
const itemSchemas = require("./schemas/item");

module.exports = buildSchema(`

    ${userSchemas.User}    
    ${lookSchemas.Look}
    ${itemSchemas.Item}

    ${userSchemas.AuthData}
    
    ${userSchemas.UserInputData}
    ${lookSchemas.LookInputData}
    ${itemSchemas.ItemInputData} 

    type RootQuery {
        ${lookSchemas.LookQueries}
        ${itemSchemas.ItemQueries}
        ${userSchemas.UserQueries}
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
