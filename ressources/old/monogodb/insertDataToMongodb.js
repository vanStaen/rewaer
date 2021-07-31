const { MongoClient } = require("mongodb");
const moment = require("moment");
const dbConfigInfo = require("../../config.db.json");

const uri =
  "mongodb+srv://" +
  dbConfigInfo.user +
  ":" +
  dbConfigInfo.password +
  "@" +
  dbConfigInfo.host +
  "/" +
  dbConfigInfo.database +
  "?retryWrites=true&w=majority&useUnifiedTopology=true";
const client = new MongoClient(uri);

async function insert() {
  try {
    await client.connect();
    const database = client.db("rewear");
    const collection = database.collection("users");

    // create a user to be inserted
    const newUser = {
      userID: 2,
      name: "TestUser",
      email: "test@user.com",
      joinDate: moment().format("DD-MM-YYYY"),
      password: "password",
      avatar: "test.jpg",
      active: false,
    };
    // insertOne vs insertMany
    const result = await collection.insertOne(newUser);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
    );
  } finally {
    await client.close();
  }
}

insert().catch(console.error);
