import { User } from "../../models/User.js";
import { Item } from "../../models/Item.js";
import { Look } from "../../models/Look.js";
import { Op } from "sequelize";

export const searchService = {
  async searchUsersAll(searchText) {
    return await User.findAll({
      where: {
        [Op.or]: [
          { userName: { [Op.iLike]: `%${searchText}%` } },
          { firstName: { [Op.iLike]: `%${searchText}%` } },
          { lastName: { [Op.iLike]: `%${searchText}%` } },
          // { profilSettings: { [Op.contains]: [req.userId] } }
        ],
      },
    });
  },

  async searchItemsAll(searchText) {
    return await Item.findAll({
      where: {
        [Op.and]: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchText}%` } },
            { brand: { [Op.iLike]: `%${searchText}%` } },
          ],
          private: false,
        },
      },
    });
  },

  async searchLooksAll(searchText) {
    return await Look.findAll({
      where: {
        [Op.and]: {
          [Op.or]: [{ title: { [Op.iLike]: `%${searchText}%` } }],
          private: false,
        },
      },
    });
  },

  async searchUsersStartingWith(searchText) {
    return await User.findAll({
      where: {
        [Op.or]: [
          { userName: { [Op.iLike]: `${searchText}%` } },
          { firstName: { [Op.iLike]: `${searchText}%` } },
          { lastName: { [Op.iLike]: `${searchText}%` } },
        ],
      },
    });
  },

  async searchItemsStartingWith(searchText) {
    return await Item.findAll({
      where: {
        [Op.and]: {
          [Op.or]: [
            { title: { [Op.iLike]: `${searchText}%` } },
            { brand: { [Op.iLike]: `${searchText}%` } },
          ],
          private: false,
        },
      },
    });
  },

  async searchLooksStartingWith(searchText) {
    return await Look.findAll({
      where: {
        [Op.and]: {
          [Op.or]: [{ title: { [Op.iLike]: `${searchText}%` } }],
          private: false,
        },
      },
    });
  },
};
