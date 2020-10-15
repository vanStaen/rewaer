const Item = require("../../models/Item");

exports.Item = {
  items: async () => {
    const items = await Item.find();
    return items;
  },
  deleteItem: async (args) => {
    const removedItem = await Item.deleteOne({ _id: args.itemId });
    return removedItem;
  },
  createItem: async (args) => {
    const item = new Item({
      user: args.itemInput.user,
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
