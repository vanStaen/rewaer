exports.Item = `
type Item {
    _id: ID!
    user: String!
    mediaUrl: String!
    dateCreated: date
    category: [String]
    desc: String
    colors: [String]
    brand: String
    active: Boolean!
    favorite: Boolean!
}`;

exports.ItemInputData = `
input ItemInputData {
    user: String!
    mediaUrl: String!
    category: [String]
    desc: String
    colors: [String]
    brand: String
}`;

exports.ItemQueries = `
    items(byUser: ID!, activeOnly: boolean): [Item!]!
`;

exports.ItemMutations = `
    createItem(itemInput: ItemInputData!): Item!
    updateItem(itemId: ID!, itemInput: ItemInputData!): Item!
    deleteItem(itemId: ID!): Item!
`;
