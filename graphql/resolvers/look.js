const Look = require("../../models/Look");
const AWS = require('aws-sdk');

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});

exports.Look = {

  looks: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const looks = await Look.find({ user: req.userId }).sort({ '_id': -1 });
    return looks.map((look) => {
      return {
        ...look._doc,
        dateCreated: new Date(look._doc.dateCreated).toISOString(),
      };
    });
  },

  deleteLook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const lookToDelete = await Look.findOne({ _id: args.lookId });
    const s3ObjectID = lookToDelete.mediaUrl.split("/").slice(-1)[0];
    const params = {  Bucket: process.env.S3_BUCKET_ID, Key: s3ObjectID };
      s3.deleteObject(params, function(err, data) {
        const paramsThumb = {  Bucket: process.env.S3_BUCKET_ID, Key: "t_" + s3ObjectID };
        s3.deleteObject(paramsThumb, function(err, data) { 
        });
      });
    await Look.deleteOne({ _id: args.lookId });
    return ({ _id: args.lookId });
  },

  createLook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const look = new Look({
      user: req.userId,
      mediaUrl: args.lookInput.mediaUrl,
      mediaUrlThumb: args.lookInput.mediaUrlThumb,
      title: args.lookInput.title,
      items: args.lookInput.items,
      category: args.lookInput.category,
    });
    const savedLook = await look.save();
    return savedLook;
  },

  updateLook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const updateField = {};
    if (args.lookInput.mediaUrl) {
      updateField.mediaUrl = args.lookInput.mediaUrl;
    }
    if (args.lookInput.mediaUrlThumb) {
      updateField.mediaUrlThumb = args.lookInput.mediaUrlThumb;
    }
    if (args.lookInput.category) {
      updateField.category = args.lookInput.category;
    }
    if (args.lookInput.title) {
      updateField.title = args.lookInput.title;
    }
    if (args.lookInput.items) {
      updateField.items = args.lookInput.items;
    }
    if (args.lookInput.active !== undefined) {
      updateField.active = args.lookInput.active;
    }
    if (args.lookInput.favorite !== undefined) {
      updateField.favorite = args.lookInput.favorite;
    }
    const updatedLook = await Look.updateOne(
      { _id: args.lookId },
      { $set: updateField }
    );
    return updatedLook;
  },
};
