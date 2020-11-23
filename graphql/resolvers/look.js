const Look = require("../../models/Look");

exports.Look = {
  looks: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const looks = await Look.find({ user: req.userId });
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
    const removedLook = await Look.deleteOne({ _id: args.lookId });
    return removedLook;
  },
  createLook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const look = new Look({
      user: req.userId,
      mediaUrl: args.lookInput.mediaUrl,
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
