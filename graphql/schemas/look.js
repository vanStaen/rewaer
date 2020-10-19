exports.Look = `
type Look {
    _id: ID!
    user: User!
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
    items: [String]
    category: [String]
    active: Boolean
    favorite: Boolean
}`;

exports.LookQueries = `
    looks: [Look]!
`;

exports.LookMutations = `
    createLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Look!
`;
