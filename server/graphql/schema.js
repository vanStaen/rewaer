import { buildSchema } from "graphql";

import * as userSchemas from "./schemas/userSchema.js";
import * as lookSchemas from "./schemas/lookSchema.js";
import * as itemSchemas from "./schemas/itemSchema.js";

export default buildSchema(`

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
