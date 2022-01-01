exports.Item = `
type Item {
    _id: ID!
    userId: Int!
    title: String
    mediaUrl: String!
    mediaUrlThumb: String!
    mediaUrlMedium: String!
    category: String
    notes: String
    location: String
    colors: [String]
    pattern: String
    brand: String
    active: Boolean!
    status: Int
    favorite: Boolean!
    private: Boolean
    sharedWith: [Int]
    likes: [Int]
    dislikes: [Int]
    createdAt: Float!
    udpatedAt: Float!
    user: User
}`;

exports.ItemInputData = `
input ItemInputData {
    title: String
    mediaUrl: String
    mediaUrlThumb: String
    mediaUrlMedium: String
    category: String
    notes: String
    location: String
    colors: [String]
    pattern: String
    brand: String
    active: Boolean
    status: Int
    favorite: Boolean
    private: Boolean
    sharedWith: [Int]
    likes: [Int]
    dislikes: [Int]
}`;

exports.ItemQueries = `
    getItems: [Item]
`;

exports.ItemMutations = `
    addItem(itemInput: ItemInputData!): Item!
    updateItem(itemId: ID!, itemInput: ItemInputData!): Item!
    deleteItem(itemId: ID!): Boolean!
`;
