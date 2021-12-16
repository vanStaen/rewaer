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
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  desc: {
    type: DataTypes.STRING,
    required: false,
  },
  colors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
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
    // 0: There, 1: Sold, 2: Thrown, 3: GivenAway, 4: Lent, 5: Lost
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Item);
Item.belongsTo(User);

module.exports = {
  Item
};