const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');
const { Item } = require('./Item');

const Look = sequelize.define("look", {
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
  dateCreated: {
    type: DataTypes.STRING,
    default: Date.now,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  category: {
    type: DataTypes.STRING,
    required: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
});

User.hasMany(Look);
Look.belongsTo(User);

Look.hasMany(Item);
Item.belongsToMany(Look);

module.exports = {
  Look
};