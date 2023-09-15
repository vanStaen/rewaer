const Sequelize = require("sequelize");

const DATABASE_NAME = process.env.DATABASE_URL.split("/")[3];
const DATABASE_URL2 = process.env.DATABASE_URL.split("/")[2];
const DATABASE_USER = DATABASE_URL2.split(":")[0];
const DATABASE_URL3 = DATABASE_URL2.split(":")[1];
const DATABASE_PWD = DATABASE_URL3.split("@")[0];
const DATABASE_HOST = DATABASE_URL3.split("@")[1];
const DATABASE_PORT = DATABASE_URL2.split(":")[2]

module.exports = {
  DataTypes: Sequelize.DataTypes,
  sequelize: new Sequelize({
    database: DATABASE_NAME,
    username: DATABASE_USER,
    password: DATABASE_PWD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  })
};
