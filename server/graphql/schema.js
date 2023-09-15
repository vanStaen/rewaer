const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/userSchema");
const lookSchemas = require("./schemas/lookSchema");
const itemSchemas = require("./schemas/itemSchema");

module.exports = buildSchema(`

    ${userSchemas.User}    
    ${lookSchemas.Look}
    ${itemSchemas.Item}
    
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
