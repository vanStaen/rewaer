import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { User } from "../../models/User.js";
import { Item } from "../../models/Item.js";
import { notificationService } from "../../api/service/notificationService.js";

export const itemResolver = {
  async getItems(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    //: where userId or sharedWith contain req.userId
    return await Item.findAll({
      where: {
        [Op.or]: [
          { userId: req.userId },
          { sharedWith: { [Op.contains]: [req.userId] } }
        ]
      },
      include: User,
      order: [
        ['active', 'DESC'],
        ['favorite', 'DESC'],
        ['id', 'DESC'],
      ],
    });
  },

  // addItem(itemInput: ItemInputData!): Item!
  async addItem(args, req) {
    try {
      const item = new Item({
        userId: req.userId,
        title: args.itemInput.title,
        mediaId: args.itemInput.mediaId,
        category: args.itemInput.category,
        desc: args.itemInput.desc,
        colors: args.itemInput.colors,
        category: args.itemInput.category,
        brand: args.itemInput.brand,
        userId: req.userId,
      });
      const newItem = await item.save();
      await notificationService.createNotificationBasic(
        req.userId,
        args.itemInput.mediaId,
        4,
        newItem.id)
      return newItem;
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
      "notes",
      "colors",
      "pattern",
      "location",
      "brand",
      "active",
      "private",
      "status",
      "favorite",
      "sharedWith",
      "likes",
      "dislikes",
      "mediaId",
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
          id: args.itemId,
        },
        returning: true,
        plain: true,
      });
      //if item set to private, delete all notification about it
      if (args.itemInput.private) {
        await notificationService.deleteNotificationItem(args.itemId)
      };
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
    const itemToDelete = await Item.findOne({ where: { id: args.itemId } });
    const itemId = itemToDelete.mediaId && itemToDelete.mediaId.split("/").slice(-1)[0];
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
          id: args.itemId,
        },
      });
      await notificationService.deleteNotificationItem(args.itemId)
      return true;
    } catch (err) {
      return err;
    }
  },
};
