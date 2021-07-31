const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');
const { Look } = require('./Look');

const Look = sequelize.define("look", {
  user: {
    type: DataTypes.STRING,
    required: true,
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
  dateCreated: {
    type: DataTypes.STRING,
    default: Date.now,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
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