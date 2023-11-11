const { User } = require("../../models/User");
const { Item } = require("../../models/Item");
const { Look } = require("../../models/Look");
const { Op } = require('sequelize');

exports.searchService = {

  async searchUsersStartingWith(searchText) {
    const lowerSearchText = searchText.toLowerCase();
    return foundUsers = await User.findAll({
      where: { 
        [Op.or]: [ 
          { userName: {[Op.iLike]: `${lowerSearchText}%`}},
          { firstName: {[Op.iLike]: `${lowerSearchText}%`}},
          { lastName: {[Op.iLike]: `${lowerSearchText}%`}}
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchItemsStartingWith(searchText) {
    const lowerSearchText = searchText.toLowerCase();
    return foundUsers = await Item.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `${lowerSearchText}%`}},
          { brand: {[Op.iLike]: `${lowerSearchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchLooksStartingWith(searchText) {
    const lowerSearchText = searchText.toLowerCase();
    return foundUsers = await Look.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `${lowerSearchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

};
