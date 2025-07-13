import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import { Look } from "../../models/Look.js";
import { notificationService } from "../../api/service/notificationService.js";

export const lookResolver = {
  async getLooks(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Look.findAll({
      where: { userId: req.userId },
      include: User,
      order: [
        ['active', 'DESC'],
        ['favorite', 'DESC'],
        ['id', 'DESC'],
      ],
    });
  },

  // addLook(lookInput: LookInputData!): Look!
  async addLook(args, req) {
    try {
      const look = new Look({
        title: args.lookInput.title,
        mediaId: args.lookInput.mediaId,
        category: args.lookInput.category,
        private: args.lookInput.private,
        userId: req.userId,
      });
      const newLook = await look.save();
      await notificationService.createNotificationBasic(
        req.userId,
        args.lookInput.mediaId,
        5,
        newLook.id)
      return newLook;
    } catch (err) {
      console.log(err);
    }
  },

  // updateLook(lookId: ID!, lookInput: LookInputData!): Look!
  async updateLook(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "title",
      "category",
      "season",
      "items",
      "active",
      "private",
      "favorite",
      "likes",
      "dislikes",
      "mediaId",
    ];
    updatableFields.forEach((field) => {
      if (field in args.lookInput) {
        updateFields[field] = args.lookInput[field];
      }
    });
    if (args.lookInput.password) {
      updateFields.password = await bcrypt.hash(args.lookInput.password, 12);
    }
    try {
      const updatedLook = await Look.update(updateFields, {
        where: {
          id: args.lookId,
        },
        returning: true,
        plain: true,
      });
      //if look set to private, delete all notification about it
      if (args.lookInput.private) {
        await notificationService.deleteNotificationLook(args.lookId)
      };
      // updatedLook[0]: number or row udpated
      // updatedLook[1]: rows updated
      return updatedLook[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteLook(lookId: ID!): Boolean!
  async deleteLook(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const lookToDelete = await Look.findOne({ where: { id: args.lookId } });
    const lookId = lookToDelete.mediaId && lookToDelete.mediaId.split("/").slice(-1)[0];
    try {
      const params = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: lookId,
      };
      const paramsThumb = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: "t_" + lookId,
      };
      const paramsMedium = {
        Bucket: process.env.S3_BUCKET_ID,
        Key: "m_" + lookId,
      };
      await Promise.all([
        s3.deleteObject(params, function (err, data) { }),
        s3.deleteObject(paramsThumb, function (err, data) { }),
        s3.deleteObject(paramsMedium, function (err, data) { }),
      ]);
      await Look.destroy({
        where: {
          id: args.lookId,
        },
      });
      await notificationService.deleteNotificationLook(args.lookId)
      return true;
    } catch (err) {
      return err;
    }
  },
};
