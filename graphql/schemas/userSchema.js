exports.User = `
type User {
    _id: ID!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    avatar: String
    emailSettings: String!
    profilSettings: String!
    language: String!
    gender: Int!
    friends: [ID]
    archived: Boolean
    lastActive: Float!
    createdAt: Float!
    udpatedAt: Float!
    items: [Item]
    looks: [Look]
}`;

exports.UserInputData = `
input UserInputData {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    avatar: String
    emailSettings: String
    profilSettings: String
    language: String
    gender: Int
    friends: [ID]
    archived: Boolean
}`;

exports.UserQueries = `
    getUser: User
`;

exports.UserMutations = `    
    addUser(userInput: UserInputData!): User!
    updateUser(userInput: UserInputData!): User!
    deleteUser: Boolean!
`;
