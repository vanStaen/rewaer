const Look = require("../../models/Look");

exports.Look = {
  looks: async () => {
    return Look.find().then((looks) => {
      return looks.map((look) => {
        return { ...look._doc };
      });
    });
  },
  deleteLook: async (args) => {
    const removedLook = await Look.deleteOne({ _id: args.lookId });
    return removedLook;
  },
  createLook: async (args) => {
    const look = new Look({
      user: args.lookInput.user,
      mediaUrl: args.lookInput.mediaUrl,
      items: args.lookInput.items,
      category: args.lookInput.category,
    });
    const savedLook = await look.save();
    return savedLook;
  },
  updateLook: async (args) => {
    const updateField = {};
    if (args.lookInput.user) {
      updateField.user = args.lookInput.user;
    }
    if (args.lookInput.mediaUrl) {
      updateField.mediaUrl = args.lookInput.mediaUrl;
    }
    if (args.lookInput.category) {
      updateField.category = args.lookInput.category;
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
