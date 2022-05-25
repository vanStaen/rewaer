exports.uploadService = {

    async rotatePicture(id, numberOfQuarterTurnToTheRight) {
        if (req.isAuth === true) {
          // Return true if has access
          return true;
        } else {
          return false;
        }
      },

};