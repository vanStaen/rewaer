const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const { User } = require("../../models/User");
const { Item } = require("../../models/Item");

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID,
});

exports.itemResolver = {
  async getItems(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Item.findAll({
      where: { userId: req.userId },
      include: User,
      order: [
        ['active', 'DESC'],
        ['favorite', 'DESC'],
      ],
    });
  },

  // addItem(itemInput: ItemInputData!): Item!
  async addItem(args, req) {
    try {
      const item = new Item({
        userId: req.userId,
        title: args.itemInput.title,
        mediaUrl: args.itemInput.mediaUrl,
        mediaUrlThumb: args.itemInput.mediaUrlThumb,
        mediaUrlMedium: args.itemInput.mediaUrlMedium,
        category: args.itemInput.category,
        desc: args.itemInput.desc,
        colors: args.itemInput.colors,
        category: args.itemInput.category,
        brand: args.itemInput.brand,
        private: args.lookInput.private,
        userId: req.userId,
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
      "private",
      "status",
      "favorite",
      "like",
      "dislike",
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
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const itemToDelete = await Item.findOne({ where: { _id: args.itemId } });
    const itemId = itemToDelete.mediaUrl && itemToDelete.mediaUrl.split("/").slice(-1)[0];
    try {
      const params = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: itemId,
      };
      const paramsThumb = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: "t_" + itemId,
      };
      const paramsMedium = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: "m_" + itemId,
      };
      await Promise.all([
        s3.deleteObject(params, function (err, data) { }),
        s3.deleteObject(paramsThumb, function (err, data) { }),
        s3.deleteObject(paramsMedium, function (err, data) { }),
      ]);
      await Item.destroy({
        where: {
          _id: args.itemId,
        },
      });
      return true;
    } catch (err) {
      return err;
    }
  },
};
