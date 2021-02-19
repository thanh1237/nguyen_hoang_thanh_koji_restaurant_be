const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const validators = require("../middlewares/validators");
const authentication = require("../middlewares/authentication");
const { body, param } = require("express-validator");
/**
 * @route POST api/review/:menuId
 * @description create review by menu id
 *@access login require
 */
router.post(
  "/:menuId",
  authentication.loginRequired,
  reviewController.createReview
);

/**
 * @route GET api/review/:menuId?page=1&limit=10
 * @description get review list by menu id
 *@access login require
 */
router.get(
  "/:menuId",
  validators.validate([
    param("menuId").exists().isString().custom(validators.checkObjectId),
  ]),
  reviewController.getReviewsOfMenu
);

/**
 * @route PUT api/review/:id
 * @description Update a review
 * @access Login required
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  reviewController.updateSingleReview
);

/**
 * @route DELETE api/review/:id
 * @description Delete a review
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  reviewController.deleteSingleReview
);

module.exports = router;
