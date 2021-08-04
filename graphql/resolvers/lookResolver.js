const bcrypt = require("bcryptjs");
const { User } = require("../../models/User");
const { Look } = require("../../models/Look");

exports.lookResolver = {
  async getLooks(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Looks.findAll({
      userId: req.userId,
      include: User,
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
    await Look.destroy({
      where: {
        _id: args.lookId,
      },
    });
    return true;
  },
};

/*
// TODO: on delete, delete s3 file too
deleteLook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const lookToDelete = await Look.findOne({ _id: args.lookId });
    const s3ObjectID = lookToDelete.mediaUrl.split("/").slice(-1)[0];
    const params = {  Bucket: process.env.S3_BUCKET_ID, Key: s3ObjectID };
      s3.deleteObject(params, function(err, data) {
        const paramsThumb = {  Bucket: process.env.S3_BUCKET_ID, Key: "t_" + s3ObjectID };
          s3.deleteObject(paramsThumb, function(err, data) { 
            const paramsMedium = {  Bucket: process.env.S3_BUCKET_ID, Key: "m_" + s3ObjectID };
            s3.deleteObject(paramsMedium, function(err, data) { 
          });
        });
      });
    await Look.deleteOne({ _id: args.lookId });
    return ({ _id: args.lookId });
  },
*/