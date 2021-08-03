exports.User = `
type User {
    _id: ID!
    firstName: String
    lastName: String
    userName: String!
    email: String!
    avatar: String
    emailSettings: String
    profilSettings: String
    friends: String
    active: Boolean
    lastActive: Boolean
}`;

exports.UserInputData = `
input UserInputData {
    firstName: String
    lastName: String
    userName: String
    email: String!
    avatar: String
    emailSettings: String
    profilSettings: String
    friends: String
    active: Boolean
}`;

exports.UserQueries = `
    user: [User]!
`;

exports.UserMutations = `    
    createUser(userInput: UserInputData!): User!
    updateUser(userId: ID!, userInput: UserInputData!): User!
`;
