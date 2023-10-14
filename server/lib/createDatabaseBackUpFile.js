const fs = require('fs');
const { Client } = require("pg");
require('dotenv').config({ path: __dirname + '/./../../.env' })


// init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification


// Connect to Postgres 
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Connected to postgres db!')
    }
})

// Fetch content from db
const fetchDatabaseContent = async (value) => {
    try {
        console.log('Database table: ', value)
        const result = await client.query(`SELECT * FROM ${value};`);
        return result.rows;
    } catch (err) {
        console.log({ error: `${err})`, });
    }
}

// Write Backup file 
const writeBackupFile = async () => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; //Start from 0
        const day = today.getDate();
        const databaseContentItems = await fetchDatabaseContent("items");
        filenameItems = `${day}-${month}-${year}_rewaer_items.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameItems}`, JSON.stringify(databaseContentItems));
        const databaseContentLooks = await fetchDatabaseContent("looks");
        filenameLooks = `${day}-${month}-${year}_rewaer_looks.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameLooks}`, JSON.stringify(databaseContentLooks));
        const databaseContentUsers = await fetchDatabaseContent("users");
        filenameUsers = `${day}-${month}-${year}_rewaer_users.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameUsers}`, JSON.stringify(databaseContentUsers));
        const databaseContentNotifications = await fetchDatabaseContent("notifications");
        filenameNotifications = `${day}-${month}-${year}_rewaer_notifications.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameNotifications}`, JSON.stringify(databaseContentNotifications));
        const databaseContentUsersfollower = await fetchDatabaseContent("usersfollowers");
        filenameUsersfollower = `${day}-${month}-${year}_rewaer_Usersfollower.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameUsersfollower}`, JSON.stringify(databaseContentUsersfollower));
        const databaseContentUsersfriend = await fetchDatabaseContent("usersfriends");
        filenameUsersfriend = `${day}-${month}-${year}_rewaer_Usersfriend.json`;
        fs.writeFileSync(`../../../database-backups/rewaer/${filenameUsersfriend}`, JSON.stringify(databaseContentUsersfriend));

        console.log("Backup Success!")
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Write Backup file 
const excecuteScript = async () => {
    try {
        await writeBackupFile();
        client.end();
    } catch (err) {
        console.log({ error: `${err})`, });
    }
};

// Running the script
excecuteScript();




