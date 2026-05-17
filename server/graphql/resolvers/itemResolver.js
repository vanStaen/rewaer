import { Op } from "sequelize";
import { User } from "../../models/User.js";
import { Item } from "../../models/Item.js";
import { notificationService } from "../../api/service/notificationService.js";
import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";

const normalizeMediaId = (mediaId) => {
  if (!mediaId) {
    return null;
  }
  if (typeof mediaId === "string") {
    return {
      mediaId,
      originalMediaId: mediaId,
    };
  }
  return {
    mediaId: mediaId.mediaId,
    originalMediaId: mediaId.originalMediaId || mediaId.mediaId,
  };
};

const getCurrentMediaId = (mediaId) =>
  typeof mediaId === "string" ? mediaId : mediaId?.mediaId;

const cleanupReplacedMedia = async (oldMediaId, newMediaId, bucket) => {
  const oldCurrentMediaId = getCurrentMediaId(oldMediaId);
  const oldOriginalMediaId =
    typeof oldMediaId === "string" ? oldMediaId : oldMediaId?.originalMediaId;
  const newCurrentMediaId = getCurrentMediaId(newMediaId);
  if (
    oldCurrentMediaId &&
    oldCurrentMediaId !== oldOriginalMediaId &&
    oldCurrentMediaId !== newCurrentMediaId
  ) {
    await deleteFileFromS3(oldCurrentMediaId, bucket);
  }
};

export const itemResolver = {
  async getItems(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    // : where userId or sharedWith contain req.userId
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          { userId: req.userId },
          { sharedWith: { [Op.contains]: [req.userId] } },
        ],
      },
      include: User,
      order: [
        ["active", "DESC"],
        ["favorite", "DESC"],
        ["id", "DESC"],
      ],
    });
    return items.map((item) => {
      item.dataValues.mediaId = normalizeMediaId(item.dataValues.mediaId);
      return item;
    });
  },

  // addItem(itemInput: ItemInputData!): Item!
  async addItem(args, req) {
    try {
      const item = new Item({
        userId: req.userId,
        title: args.itemInput.title,
        mediaId: normalizeMediaId(args.itemInput.mediaId),
        category: args.itemInput.category,
        pattern: args.itemInput.pattern,
        desc: args.itemInput.desc,
        colors: args.itemInput.colors,
        size: args.itemInput.size,
        brand: args.itemInput.brand,
      });
      const newItem = await item.save();
      await notificationService.createNotificationBasic(
        req.userId,
        getCurrentMediaId(args.itemInput.mediaId),
        4,
        newItem.id,
      );
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
    const updateFields = {};
    const updatableFields = [
      "title",
      "category",
      "notes",
      "colors",
      "pattern",
      "location",
      "brand",
      "size",
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
    if (args.itemInput.mediaId) {
      const oldItem = await Item.findOne({ where: { id: args.itemId } });
      const normalizedInputMediaId = normalizeMediaId(args.itemInput.mediaId);
      updateFields.mediaId = {
        ...normalizeMediaId(oldItem.mediaId),
        ...normalizedInputMediaId,
      };
      await cleanupReplacedMedia(oldItem.mediaId, updateFields.mediaId, "items");
    }
    try {
      const updatedItem = await Item.update(updateFields, {
        where: {
          id: args.itemId,
        },
        returning: true,
        plain: true,
      });
      // if item set to private, delete all notification about it
      if (args.itemInput.private) {
        await notificationService.deleteNotificationItem(args.itemId);
      }
      // updatedItem[0]: number or row udpated
      // updatedItem[1]: rows updated
      updatedItem[1].dataValues.mediaId = normalizeMediaId(
        updatedItem[1].dataValues.mediaId,
      );
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
    try {
      const normalizedMediaId = normalizeMediaId(itemToDelete.mediaId);
      await deleteFileFromS3(normalizedMediaId.mediaId, "items");
      if (normalizedMediaId.originalMediaId !== normalizedMediaId.mediaId) {
        await deleteFileFromS3(normalizedMediaId.originalMediaId, "items");
      }
      await Item.destroy({
        where: {
          id: args.itemId,
        },
      });
      await notificationService.deleteNotificationItem(args.itemId);
      return true;
    } catch (err) {
      return err;
    }
  },
};
