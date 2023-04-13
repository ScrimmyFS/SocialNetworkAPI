const router = require("express").Router();
const thoughtsRoutes = require("./thoughtsroutes");
const userRoutes = require("./userroutes");

router.use("/thoughts", thoughtsRoutes);
router.use("/users", userRoutes);

module.exports = router;
