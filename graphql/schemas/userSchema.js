exports.User = `
type User {
    _id: ID!
    firstName: String!
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
    password: String
    avatar: String
    emailSettings: String
    profilSettings: String
    friends: String
    active: Boolean
}`;

exports.UserQueries = `
    getUser: User
`;

exports.UserMutations = `    
    addUser(userInput: UserInputData!): User!
    updateUser(userId: ID!, userInput: UserInputData!): User!
    deleteUser(_id: ID!): Boolean!
`;
