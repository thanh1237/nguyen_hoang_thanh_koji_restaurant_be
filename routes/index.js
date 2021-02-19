var express = require("express");
var router = express.Router();

const userApi = require("./user.api");
router.use("/users", userApi);

const authApi = require("./auth.api");
router.use("/auth", authApi);

const tableApi = require("./table.api");
router.use("/table", tableApi);

const bookingApi = require("./booking.api");
router.use("/booking", bookingApi);

const resumeApi = require("./resume.api");
router.use("/resume", resumeApi);

const menuApi = require("./menu.api");
router.use("/menu", menuApi);

const reactionApi = require("./reaction.api");
router.use("/reaction", reactionApi);

const reviewApi = require("./review.api");
router.use("/review", reviewApi);

module.exports = router;
