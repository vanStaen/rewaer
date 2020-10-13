exports.Look = `
type Look {
    _id: ID!
    user: String!
    mediaUrl: String!
    dateCreated: date
    items: [String!]
    category: [String]
    active: Boolean!
    favorite: Boolean!
}`;

exports.LookInputData = `
input LookInputData {
    user: String!
    mediaUrl: String!
    dateCreated: date
    items: [String]
    category: [String]
}`;

exports.LookQueries = `
    Look(name: String): Look!
`;

exports.LookMutations = `
    createLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Look!
`;
