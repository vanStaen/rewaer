exports.Look = `
type Look {
    _id: ID!
    userId: Int!
    title: String
    mediaUrl: String!
    mediaUrlThumb: String!
    mediaUrlMedium: String!
    category: String
    season: String
    items: [Int]
    active: Boolean!
    favorite: Boolean!
    private: Boolean
    likes: [Int]
    dislikes: [Int]
    createdAt: Float!
    udpatedAt: Float!
    user: User
}`;

exports.LookInputData = `
input LookInputData {
    title: String
    mediaUrl: String
    mediaUrlThumb: String
    mediaUrlMedium: String
    category: String
    season: String
    items: [Int]
    active: Boolean
    favorite: Boolean
    private: Boolean
    likes: [Int]
    dislikes: [Int]
}`;

exports.LookQueries = `
    getLooks: [Look]
`;

exports.LookMutations = `
    addLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Boolean!
`;
