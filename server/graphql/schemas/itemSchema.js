export const Item = `
type Item {
    id: ID!
    userId: Int!
    title: String
    mediaId: String!
    category: String
    notes: String
    location: String
    size: String
    colors: [String]
    pattern: String
    brand: String
    active: Boolean!
    status: String
    favorite: Boolean!
    private: Boolean
    sharedWith: [Int]
    likes: [Int]
    dislikes: [Int]
    createdAt: Float!
    udpatedAt: Float!
    user: User
}`;

export const ItemInputData = `
input ItemInputData {
    title: String
    mediaId: String
    category: String
    notes: String
    location: String
    size: String
    colors: [String]
    pattern: String
    brand: String
    active: Boolean
    status: String
    favorite: Boolean
    private: Boolean
    sharedWith: [Int]
    likes: [Int]
    dislikes: [Int]
}`;

export const ItemQueries = `
    getItems: [Item]
`;

export const ItemMutations = `
    addItem(itemInput: ItemInputData!): Item!
    updateItem(itemId: ID!, itemInput: ItemInputData!): Item!
    deleteItem(itemId: ID!): Boolean!
`;
