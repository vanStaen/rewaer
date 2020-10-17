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

exports.AuthData = `
type AuthData {
    token: String!
    userId: String!
    }
`;

exports.UserInputData = `
input UserInputData {
    name: String
    email: String!
    password: String!
    avatar: String
    active: Boolean
}`;

exports.UserQueries = `
    login(email: String!, password: String!): AuthData!
    users: [User!]!
`;

exports.UserMutations = `    
    createUser(userInput: UserInputData!): User!
    updateUser(userId: ID!, userInput: UserInputData!): User!
    deleteUser(userId: ID!): User
`;
