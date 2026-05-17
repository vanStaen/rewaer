export const Item = `
type MediaId {
    mediaId: String!
    originalMediaId: String!
}

type Item {
    id: ID!
    userId: Int!
    title: String
    mediaId: MediaId!
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
input MediaIdInput {
    mediaId: String!
    originalMediaId: String!
}

input ItemInputData {
    title: String
    mediaId: MediaIdInput
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
