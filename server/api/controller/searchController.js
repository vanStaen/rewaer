import { Router } from "express";
import searchService from "../service/searchService.js";
const router = Router();


router.post("/", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const searchText = req.body.searchText.toLowerCase();
    const foundUsers = await searchService.searchUsersStartingWith(searchText);
    const foundItems = await searchService.searchItemsStartingWith(searchText);
    const foundLooks = await searchService.searchLooksStartingWith(searchText);
    res.status(200).json({
      count: foundUsers.length + foundItems.length + foundLooks.length,
      users: foundUsers,
      items: foundItems,
      looks: foundLooks,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/more", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const searchText = req.body.searchText.toLowerCase();
    const foundUsersAll = await searchService.searchUsersAll(searchText);
    const foundItemsAll = await searchService.searchItemsAll(searchText);
    const foundLooksAll = await searchService.searchLooksAll(searchText);
    res.status(200).json({
      count: foundUsersAll.length + foundItemsAll.length + foundLooksAll.length,
      users: foundUsersAll,
      items: foundItemsAll,
      looks: foundLooksAll,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export default router;