const router = require("express").Router();

const userRoutes = require("./User");
const postRoutes = require("./Post");

router.use("/user", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
