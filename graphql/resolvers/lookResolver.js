const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const { User } = require("../../models/User");
const { Look } = require("../../models/Look");

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID,
});

exports.lookResolver = {
  async getLooks(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Look.findAll({
      where: { userId: req.userId },
      include: User,
      order: [
        ['favorite', 'DESC'],
    ],
    });
  },

  // addLook(lookInput: LookInputData!): Look!
  async addLook(args, req) {
    try {
      const look = new Look({
        title: args.lookInput.title,
        mediaUrl: args.lookInput.mediaUrl,
        mediaUrlThumb: args.lookInput.mediaUrlThumb,
        mediaUrlMedium: args.lookInput.mediaUrlMedium,
        category: args.lookInput.category,
        items: args.lookInput.items,
        userId: req.userId,
      });
      return await look.save();
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
      "items",
      "active",
      "favorite",
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
          _id: args.lookId,
        },
        returning: true,
        plain: true,
      });
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
    const lookToDelete = await Look.findOne({ where: { _id: args.lookId } });
    const lookId = lookToDelete.mediaUrl && lookToDelete.mediaUrl.split("/").slice(-1)[0];
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
        s3.deleteObject(params, function (err, data) {}),
        s3.deleteObject(paramsThumb, function (err, data) {}),
        s3.deleteObject(paramsMedium, function (err, data) {}),
      ]);
      await Look.destroy({
        where: {
          _id: args.lookId,
        },
      });
      return true;
    } catch (err) {
      return err;
    }
  },
};
