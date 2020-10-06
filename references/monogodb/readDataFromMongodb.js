const { MongoClient } = require("mongodb");
const dbConfigInfo = require('../../config.db.json');

const uri = "mongodb+srv://" + dbConfigInfo.user + ":" + dbConfigInfo.password + "@" + dbConfigInfo.host + "/" + dbConfigInfo.database + "?retryWrites=true&w=majority&useUnifiedTopology=true"
const client = new MongoClient(uri);

async function read() {
    try {
        await client.connect();
        const database = client.db("rewear");
        const collection = database.collection("users");

        // query for user that have a userID greater than 0
        const query = { userID: { $gte: 0 } };

        const options = {
            // sort returned documents in ascending order by userID
            sort: { userID: 1 }
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

read().catch(console.error);