const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Item = sequelize.define("item", {
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
    type: DataTypes.STRING,
    defaultValue: null,
  },
  notes: {
    type: DataTypes.STRING,
    required: false,
  },
  location: {
    type: DataTypes.STRING,
    required: false,
  },
  colors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  pattern: {
    type: DataTypes.STRING,
    required: false,
  },
  brand: {
    type: DataTypes.STRING,
    required: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "S0",
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    required: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sharedWith: {
    //array of user id
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  likes: {
    //array of user id
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  dislikes: {
    //array of user id
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

User.hasMany(Item);
Item.belongsTo(User);

module.exports = {
  Item
};