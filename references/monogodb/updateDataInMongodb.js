const { MongoClient } = require("mongodb");
const dbConfigInfo = require('../../config.db.json');

const uri = "mongodb+srv://" + dbConfigInfo.user + ":" + dbConfigInfo.password + "@" + dbConfigInfo.host + "/" + dbConfigInfo.database + "?retryWrites=true&w=majority&useUnifiedTopology=true"
const client = new MongoClient(uri);

async function update() {
    try {
        await client.connect();

        const database = client.db("rewear");
        const collection = database.collection("users");

        // create a filter 
        const filter = { userID: 2 };

        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };

        // create a document that sets the name to something new
        const updateUser = {
            $set: { name: "TestUserUpdate" },
        };

        // updateOne vs updateMany
        const result = await collection.updateMany(filter, updateUser, options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
    } finally {
        await client.close();
    }
}

update().catch(console.dir);
