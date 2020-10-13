const { MongoClient } = require("mongodb");
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

async function read(db_name, db_collection) {
  try {
    await client.connect();
    const database = client.db(db_name);
    const collection = database.collection(db_collection);

    // query for user that have a userID greater than 0
    const query = { userID: { $gte: 0 } };

    const options = {
      // sort returned documents in ascending order by userID
      sort: "userID",
    };

    const cursor = collection.find(query, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach(console.error);
  } finally {
    await client.close();
  }
}

const users = read("rewear", "users").catch(console.error);
