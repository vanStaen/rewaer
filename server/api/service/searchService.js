const { User } = require("../../models/User");
const { Item } = require("../../models/Item");
const { Look } = require("../../models/Look");
const { Op } = require('sequelize');

exports.searchService = {

  async searchUsersAll(searchText) {
    return foundUsers = await User.findAll({
      where: { 
        [Op.or]: [ 
          { userName: {[Op.iLike]: `%${searchText}%`}},
          { firstName: {[Op.iLike]: `%${searchText}%`}},
          { lastName: {[Op.iLike]: `%${searchText}%`}}
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchItemsAll(searchText) {
    return foundUsers = await Item.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `%${searchText}%`}},
          { brand: {[Op.iLike]: `%${searchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchLooksAll(searchText) {
    return foundUsers = await Look.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `%${searchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchUsersStartingWith(searchText) {
    return foundUsers = await User.findAll({
      where: { 
        [Op.or]: [ 
          { userName: {[Op.iLike]: `${searchText}%`}},
          { firstName: {[Op.iLike]: `${searchText}%`}},
          { lastName: {[Op.iLike]: `${searchText}%`}}
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchItemsStartingWith(searchText) {
    return foundUsers = await Item.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `${searchText}%`}},
          { brand: {[Op.iLike]: `${searchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

  async searchLooksStartingWith(searchText) {
    return foundUsers = await Look.findAll({
      where: { 
        [Op.or]: [ 
          { title: {[Op.iLike]: `${searchText}%`}},
          //{ profilSettings: { [Op.contains]: [req.userId] } }
        ]
      },
    });
  },

};
