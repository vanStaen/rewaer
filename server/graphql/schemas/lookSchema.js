export const Look = `
type Look {
    _id: ID!
    userId: Int!
    title: String
    mediaId: String!
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

export const LookInputData = `
input LookInputData {
    title: String
    mediaId: String
    category: String
    season: String
    items: [Int]
    active: Boolean
    favorite: Boolean
    private: Boolean
    likes: [Int]
    dislikes: [Int]
}`;

export const LookQueries = `
    getLooks: [Look]
`;

export const LookMutations = `
    addLook(lookInput: LookInputData!): Look!
    updateLook(lookId: ID!, lookInput: LookInputData!): Look!
    deleteLook(lookId: ID!): Boolean!
`;
