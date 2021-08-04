const bcrypt = require("bcryptjs");
const { User } = require("../../models/User");
const { Item } = require("../../models/Item");

exports.itemResolver = {
  async getItems(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Items.findAll({
      userId: req.userId,
      include: User,
    });
  },

  // addItem(itemInput: ItemInputData!): Item!
  async addItem(args, req) {
    try {
      const item = new Item({
        title: args.itemInput.title,
        mediaUrl: args.itemInput.mediaUrl,
        mediaUrlThumb: args.itemInput.mediaUrlThumb,
        mediaUrlMedium: args.itemInput.mediaUrlMedium,
        category: args.itemInput.category,
        desc: args.itemInput.desc,
        colors: args.itemInput.colors,
        category: args.itemInput.category,
        brand: args.itemInput.brand,
      });
      return await item.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateItem(itemId: ID!, itemInput: ItemInputData!): Item!
  async updateItem(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "title",
      "category",
      "desc",
      "colors",
      "brand",
      "active",
      "favorite",
    ];
    updatableFields.forEach((field) => {
      if (field in args.itemInput) {
        updateFields[field] = args.itemInput[field];
      }
    });
    if (args.itemInput.password) {
      updateFields.password = await bcrypt.hash(args.itemInput.password, 12);
    }
    try {
      const updatedItem = await Item.update(updateFields, {
        where: {
          _id: args.itemId,
        },
        returning: true,
        plain: true,
      });
      // updatedItem[0]: number or row udpated
      // updatedItem[1]: rows updated
      return updatedItem[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteItem(itemId: ID!): Boolean!
  async deleteItem(args, req) {
    await Item.destroy({
      where: {
        _id: args.itemId,
      },
    });
    return true;
  },
};

/*
// TODO: on delete, delete s3 file too
deleteItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const itemToDelete = await Item.findOne({ _id: args.itemId });
    const s3ObjectID = itemToDelete.mediaUrl.split("/").slice(-1)[0];
    const params = {  Bucket: process.env.S3_BUCKET_ID, Key: s3ObjectID };
      s3.deleteObject(params, function(err, data) {
        const paramsThumb = {  Bucket: process.env.S3_BUCKET_ID, Key: "t_" + s3ObjectID };
          s3.deleteObject(paramsThumb, function(err, data) { 
            const paramsMedium = {  Bucket: process.env.S3_BUCKET_ID, Key: "m_" + s3ObjectID };
            s3.deleteObject(paramsMedium, function(err, data) { 
          });
        });
      });
    await Item.deleteOne({ _id: args.itemId });
    return ({ _id: args.itemId });
  },
*/