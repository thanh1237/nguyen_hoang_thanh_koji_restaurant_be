const express = require("express");
const bookingController = require("../controllers/booking.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

/**
 * @route GET api/booking
 * @description Get list of booking
 * @access login required
//  */
router.get(
  "/",
  authentication.loginRequired,
  bookingController.getListOfBooking
);

/**
 * @route POST api/booking
 * @description Create booking
 * @access login required
 */
router.post("/", authentication.loginRequired, bookingController.createBooking);

/**
 * @route GET api/booking/:id
 * @description Get a single booking
 * @access login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  bookingController.getSingleBooking
);
// /**
//  * @route PUT api/booking/:id
//  * @description put a single booking
//  * @access login required
//  */
// router.put(
//   "/:id",
//   authentication.loginRequired,
//   bookingController.updateSingleBooking
// );

/**
 * @route DELETE api/booking/:id
 * @description Delete a booking
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  bookingController.deleteSingleBooking
);

module.exports = router;
