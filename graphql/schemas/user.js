exports.User = `
type User {
    _id: ID!
    name: String!
    email: String!
    dateCreated: date
    encryptedPWD: String!
    avatar: String
    active: Boolean!
}`;

exports.UserInputData = `
input UserInputData {
    name: String!
    email: String!
    encryptedPWD: String!
    avatar: String
}`;

exports.UserQueries = `
    user(name: String): User!
`;

exports.UserMutations = `    
    createUser(userInput: UserInputData!): User!
    updateUser(userId: ID!, userInput: UserInputData!): User!
    deleteUser(userId: ID!): User!
`;
