import fs from "fs";
import pg from "pg";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/./../../.env" });

// init Postgres
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Connected to postgres db!");
  }
});

// Fetch content from db
const fetchDatabaseContent = async (value) => {
  try {
    console.log("Database table: ", value);
    const result = await client.query(`SELECT * FROM ${value};`);
    return result.rows;
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Write Backup file
const writeBackupFile = async () => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Start from 0
    const day = today.getDate();
    const databaseContentItems = await fetchDatabaseContent("items");
    const filenameItems = `${day}-${month}-${year}_rewaer_items.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameItems}`,
      JSON.stringify(databaseContentItems),
    );
    const databaseContentLooks = await fetchDatabaseContent("looks");
    const filenameLooks = `${day}-${month}-${year}_rewaer_looks.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameLooks}`,
      JSON.stringify(databaseContentLooks),
    );
    const databaseContentUsers = await fetchDatabaseContent("users");
    const filenameUsers = `${day}-${month}-${year}_rewaer_users.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameUsers}`,
      JSON.stringify(databaseContentUsers),
    );
    const databaseContentNotifications =
      await fetchDatabaseContent("notifications");
    const filenameNotifications = `${day}-${month}-${year}_rewaer_notifications.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameNotifications}`,
      JSON.stringify(databaseContentNotifications),
    );
    const databaseContentUsersfollower =
      await fetchDatabaseContent("usersfollowers");
    const filenameUsersfollower = `${day}-${month}-${year}_rewaer_Usersfollower.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameUsersfollower}`,
      JSON.stringify(databaseContentUsersfollower),
    );
    const databaseContentUsersfriend =
      await fetchDatabaseContent("usersfriends");
    const filenameUsersfriend = `${day}-${month}-${year}_rewaer_Usersfriend.json`;
    fs.writeFileSync(
      `../../../database-backups/rewaer/${filenameUsersfriend}`,
      JSON.stringify(databaseContentUsersfriend),
    );

    console.log("Backup Success!");
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Write Backup file
const excecuteScript = async () => {
  try {
    await writeBackupFile();
    client.end();
  } catch (err) {
    console.log({ error: `${err})` });
  }
};

// Running the script
excecuteScript();
