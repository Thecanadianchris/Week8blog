const router = require("express").Router();

const userRoutes = require("./user");
const categoryRoutes = require("./category");

const postRoutes = require("./post");

router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/posts", postRoutes);



module.exports = router;``