const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Booking = require("../models/Booking");
const User = require("../models/User");

const bookingController = {};

bookingController.getListOfBooking = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  //filter avai/pending/confirm/cancel

  const totalBooking = await Booking.countDocuments({
    ...filter,
    isDeleted: false,
  });

  // console.log({ filter, sortBy });
  const booking = await Booking.find()
    .sort({ ...sortBy, createdAt: -1 })
    .populate("user")
    .populate("tableId");

  return sendResponse(res, 200, true, { booking }, null, "");
});

bookingController.createBooking = catchAsync(async (req, res, next) => {
  const users = req.userId;
  const currentUser = await User.findOne({ _id: users });
  // if (currentUser.role != "admin")
  //   return next(new AppError(400, "Admin Required", "Create Table Error"));
  const { user, tableId } = req.body;

  const booking = await Booking.create({
    user,
    tableId,
  });

  return sendResponse(
    res,
    200,
    true,
    booking,
    null,
    "Create new booking successful"
  );
});

bookingController.getSingleBooking = catchAsync(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking)
    return next(
      new AppError(404, "Table not found", "Get Single Booking Error")
    );
  booking = booking.toJSON();
  return sendResponse(res, 200, true, booking, null, null);
});

bookingController.deleteSingleBooking = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id;

  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId },
    { isDeleted: true },
    { new: true }
  );
  if (!booking)
    return next(
      new AppError(
        400,
        "Booking not found or User not authorized",
        "Delete Booking Error"
      )
    );

  return sendResponse(res, 200, true, null, null, "Delete booking successful");
});

module.exports = bookingController;
