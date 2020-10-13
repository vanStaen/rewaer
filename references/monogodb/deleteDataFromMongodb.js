const { MongoClient } = require("mongodb");
const dbConfigInfo = require('../../config.db.json');

const uri = "mongodb+srv://" + dbConfigInfo.user + ":" + dbConfigInfo.password + "@" + dbConfigInfo.host + "/" + dbConfigInfo.database + "?retryWrites=true&w=majority&useUnifiedTopology=true"
const client = new MongoClient(uri);

async function deleteData() {
    try {
        await client.connect();

        const database = client.db("rewear");
        const collection = database.collection("users");

        const query = { userID: 2 };

        // deleteOne vs deleteMany
        const result = await collection.deleteMany(query);
        console.log("Deleted " + result.deletedCount + " documents");

    } finally {
        await client.close();
    }
}

deleteData().catch(console.dir);
