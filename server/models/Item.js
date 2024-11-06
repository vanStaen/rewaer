import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Item = sequelize.sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  mediaId: {
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