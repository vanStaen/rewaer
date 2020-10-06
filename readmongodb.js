const { MongoClient } = require('mongodb');
const dbConfigInfo = require('./config.db.json');

async function main() {
    const uri = "mongodb+srv://" + dbConfigInfo.user + ":" + dbConfigInfo.password + "@" + dbConfigInfo.host + "/" + dbConfigInfo.database + "?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Run main
main().catch(console.error);