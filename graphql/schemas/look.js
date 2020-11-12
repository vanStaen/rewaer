exports.Look = `
type Look {
    _id: ID!
    title: String
    user: String!
    mediaUrl: String!
    dateCreated: String!
    items: [String!]
    category: [String]
    active: Boolean!
    favorite: Boolean!
}`;

exports.LookInputData = `
input LookInputData {
    mediaUrl: String
    title: String
    items: [String]
    category: [String]
    active: Boolean
    favorite: Boolean
    user: String! 
}`;

exports.LookQueries = `
    looks: [Look]!
`;

exports.LookMutations = `
    createLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Look!
`;
