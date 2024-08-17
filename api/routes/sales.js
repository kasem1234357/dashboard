const { getOverallStats } = require("../controller/sales");
const { restrict,isAuth } = require("../meddlewares");

const router = require("express").Router();
router.get('/',isAuth,restrict('super_admin','sales_manger'),getOverallStats)
module.exports = router