exports.User = `
type User {
    _id: ID!
    name: String
    email: String!
    dateCreated: String!
    password: String
    avatar: String
    active: Boolean
}`;

exports.UserInputData = `
input UserInputData {
    name: String
    email: String!
    password: String!
    avatar: String
    active: Boolean
}`;

exports.UserQueries = `
    user: [User]!
`;

exports.UserMutations = `    
    createUser(userInput: UserInputData!): User!
    updateUser(userId: ID!, userInput: UserInputData!): User!
`;
