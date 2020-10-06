const { MongoClient } = require("mongodb");
const dbConfigInfo = require('../../config.db.json');

const uri = "mongodb+srv://" + dbConfigInfo.user + ":" + dbConfigInfo.password + "@" + dbConfigInfo.host + "/" + dbConfigInfo.database + "?retryWrites=true&w=majority&useUnifiedTopology=true"
const client = new MongoClient(uri);

async function read() {
    try {
        await client.connect();
        const database = client.db("rewear");
        const collection = database.collection("users");

        /* query for movies that have a runtime less than 15 minutes
        const query = { runtime: { $lt: 15 } };

        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: { title: 1 },
            // Include only the `title` and `imdb` fields in each returned document
            projection: { _id: 0, title: 1, imdb: 1 },
        };

        const cursor = collection.find(query, options);*/
        const cursor = collection.find();

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