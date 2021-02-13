const { errorName } = require("../../config/errors")

exports.Dummy = {
  dummy: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
      return {
        dummy: true
      };
  },
};
