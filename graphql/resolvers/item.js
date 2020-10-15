const Item = require("../../models/Item");

exports.Item = {
  items: async () => {
    const items = await Item.find();
    return items;
  },
  deleteItem: async (args) => {
    const removedItem = await Item.deleteOne({ _id: args.userId });
    return removedItem;
  },
};
