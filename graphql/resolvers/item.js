const Item = require("../../models/Item");

exports.Item = {
  items: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const items = await Item.find();
    return items.map((item) => {
      return {
        ...item._doc,
        dateCreated: new Date(item._doc.dateCreated).toISOString(),
      };
    });
  },
  deleteItem: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const removedItem = await Item.deleteOne({ _id: args.itemId });
    return removedItem;
  },
  createItem: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const item = new Item({
      user: "5f8b4de2a1448a92c7ba74eb",
      mediaUrl: args.itemInput.mediaUrl,
      category: args.itemInput.category,
      desc: args.itemInput.desc,
      colors: args.itemInput.colors,
      brand: args.itemInput.brand,
    });
    const savedItem = await item.save();
    return savedItem;
  },
  updateItem: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const updateField = {};
    if (args.itemInput.user) {
      updateField.user = args.itemInput.user;
    }
    if (args.itemInput.mediaUrl) {
      updateField.mediaUrl = args.itemInput.mediaUrl;
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
