const { sequelize, DataTypes } = require("../lib/sequelizedb");
const { User } = require("./User");

const Look = sequelize.define("look", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  mediaUrl: {
    type: DataTypes.STRING,
    required: true,
  },
  mediaUrlThumb: {
    type: DataTypes.STRING,
    required: true,
  },
  mediaUrlMedium: {
    type: DataTypes.STRING,
    required: true,
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Look);
Look.belongsTo(User);

module.exports = {
  Look,
};
