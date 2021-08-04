exports.Look = `
type Look {
    _id: ID!
    title: String
    mediaUrl: String!
    mediaUrlThumb: String!
    mediaUrlMedium: String!
    category: [String]
    items: [String]
    active: Boolean!
    favorite: Boolean!
    userId: Int!
    user: User
}`;

exports.LookInputData = `
input LookInputData {
    title: String
    mediaUrl: String
    mediaUrlThumb: String
    mediaUrlMedium: String
    category: [String]
    items: [String]
    active: Boolean
    favorite: Boolean
}`;

exports.LookQueries = `
    looks: [Look]
`;

exports.LookMutations = `
    createLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Look!
`;
