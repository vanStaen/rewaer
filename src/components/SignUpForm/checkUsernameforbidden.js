import { forbiddenUsername } from "../../lib/data/forbiddenUsername.js";

export const checkUsernameforbidden = async (username) => {
  if (username in forbiddenUsername) {
    return true;
  }
  return false;
};
