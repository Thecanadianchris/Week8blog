const router = require("express").Router();
const { Post, User, Category } = require("../models");
const { authMiddleware } = require("../utils/auth");


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





router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    if (post.userId !== req.user.id) {
      res.status(403).json({ message: "You can only edit your own posts" });
      return;
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.categoryId = req.body.categoryId;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
      userId: req.user.id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});





router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    if (post.userId !== req.user.id) {
      res.status(403).json({ message: "You can only delete your own posts" });
      return;
    }

    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;