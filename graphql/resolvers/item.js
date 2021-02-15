const Item = require("../../models/Item");
const { errorName } = require("../../config/errors")
const AWS = require('aws-sdk');

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});

exports.Item = {

  items: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const items = await Item.find({ user: req.userId }).sort({ '_id': -1 });
    return items.map((item) => {
      return {
        ...item._doc,
        dateCreated: new Date(item._doc.dateCreated).toISOString(),
      };
    });
  },

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

  createItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const item = new Item({
      user: req.userId,
      mediaUrl: args.itemInput.mediaUrl,
      mediaUrlThumb: args.itemInput.mediaUrlThumb,
      mediaUrlMedium: args.itemInput.mediaUrlMedium,
      title: args.itemInput.title,
      category: args.itemInput.category,
      desc: args.itemInput.desc,
      colors: args.itemInput.colors,
      brand: args.itemInput.brand,
    });
    const savedItem = await item.save();
    return savedItem;
  },

  updateItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const updateField = {};
    if (args.itemInput.user) {
      updateField.user = args.itemInput.user;
    }
    if (args.itemInput.mediaUrl) {
      updateField.mediaUrl = args.itemInput.mediaUrl;
    }
    if (args.itemInput.mediaUrlThumb) {
      updateField.mediaUrlThumb = args.itemInput.mediaUrlThumb;
    }
    if (args.itemInput.mediaUrlMedium) {
      updateField.mediaUrlMedium = args.itemInput.mediaUrlMedium;
    }
    if (args.itemInput.title) {
      updateField.title = args.itemInput.title;
    }
    if (args.itemInput.category) {
      updateField.category = args.itemInput.category;
    }
    if (args.itemInput.desc) {
      updateField.desc = args.itemInput.desc;
    }
    if (args.itemInput.colors) {
      updateField.colors = args.itemInput.colors;
    }
    if (args.itemInput.active !== undefined) {
      updateField.active = args.itemInput.active;
    }
    if (args.itemInput.favorite !== undefined) {
      updateField.favorite = args.itemInput.favorite;
    }
    const updatedItem = await Item.updateOne(
      { _id: args.itemId },
      { $set: updateField }
    );
    return updatedItem;
  },
};
