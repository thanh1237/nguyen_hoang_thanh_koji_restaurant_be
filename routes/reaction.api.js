const express = require("express");
const reactionController = require("../controllers/reaction.controller");
const router = express.Router();
const authentication = require("../middlewares/authentication");

/**
 * @route POST api/reaction
 * @description create reaction by menu id
 *@access login require
 */
router.post(
  "/",
  authentication.loginRequired,
  reactionController.createReaction
);

/**
 * @route GET api/reaction/:id
 * @description Get all reactions of single Menu Id . Menu Id is send from front end by Params
 *@access login required
 */
router.get(
  "/:menuId",
  // authentication.loginRequired,
  reactionController.getSingleReaction
);

module.exports = router;
