const router = require("express").Router();
const { searchService } = require("../service/searchService");

router.post("/", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const searchText = req.body.searchText;
    const foundUsers = await searchService.searchUsersStartingWith(searchText);
    const foundItems = await searchService.searchItemsStartingWith(searchText);
    const foundLooks = await searchService.searchLooksStartingWith(searchText);
    res.status(200).json({
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

module.exports = router;