export const User = `
type User {
    id: ID!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    avatar: String
    emailSettings: String!
    profilSettings: String!
    language: String!
    gender: Int!
    archived: Boolean
    usernameChange: Int
    lastActive: String!
    createdAt: String!
    udpatedAt: String!
    items: [Item]
    looks: [Look]
    friends: [User]
    followers: [User]
    followed: [User]
}`;

export const UserInputData = `
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
    archived: Boolean
    usernameChange: Int
}`;

export const UserQueries = `
    getUser: User
    getFriends: [User]
    getFollowers: [User]
    getFollowed: [User]
    getProfileByName(userName: String): User
    getProfileById(id: ID!): User
`;

export const UserMutations = `    
    addUser(userInput: UserInputData!): User!
    updateUser(userInput: UserInputData!): User!
    deleteUser: Boolean!
`;
