const router = require("express").Router();
const { createInviteCode } = require("../controller/auth");
const { restrict } = require("../meddlewares");
// const { isAuth } = require("./authMiddleware");

router.post("/",restrict('super_admin'),createInviteCode)

module.exports =router