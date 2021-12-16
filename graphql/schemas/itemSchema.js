exports.Item = `
type Item {
    _id: ID!
    userId: Int!
    title: String
    mediaUrl: String!
    mediaUrlThumb: String!
    mediaUrlMedium: String!
    category: [String]
    desc: String
    colors: [String]
    brand: String
    active: Boolean!
    status: Int
    favorite: Boolean!
    private: Boolean!
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
    category: [String]
    desc: String
    colors: [String]
    brand: String
    active: Boolean
    status: Int
    favorite: Boolean
    private: Boolean
}`;

exports.ItemQueries = `
    getItems: [Item]
`;

exports.ItemMutations = `
    addItem(itemInput: ItemInputData!): Item!
    updateItem(itemId: ID!, itemInput: ItemInputData!): Item!
    deleteItem(itemId: ID!): Boolean!
`;
