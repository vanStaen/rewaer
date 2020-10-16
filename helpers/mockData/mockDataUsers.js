/* rewaer_users */
const users = [
  {
    _id: {
      $oid: "5f7b6eb267bc3d80cd193d0e",
    },
    userID: 0,
    name: "Clément",
    email: "clement.vanstaengmail.com",
    joinDate: "03-09-2019",
    password: "61cf1385b1755bbee51cfc02400b1825",
    avatar: "1.jpg",
    active: true,
  },
  {
    _id: {
      $oid: "5f7b703967bc3d80cd193d10",
    },
    userID: 1,
    name: "Theresa",
    email: "theresa.pogge@gmail.com",
    joinDate: "03-09-2019",
    password: "931dd0ac6207488f6e0a63acd7eb977e",
    avatar: "2.jpg",
    active: true,
  },
];

module.exports = users;
