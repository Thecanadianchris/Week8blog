const router = require("express").Router();
const { Post, User, Category } = require("../models");



router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }



    const posts = await Post.findAll({
      where: filter,
      include: [
        { model: User, attributes: ["username"] },
        { model: Category, as: "category" },
      ],
    });



    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;