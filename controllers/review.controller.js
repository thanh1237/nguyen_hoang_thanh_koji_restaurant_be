const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Review = require("../models/Review");
const Menu = require("../models/Menu");
const User = require("../models/User");
const reviewController = {};

reviewController.createReview = catchAsync(async (req, res, next) => {
  // if (currentUser.role != "admin")
  //   return next(new AppError(400, "Admin Required", "Create Table Error"));
  const menuId = req.params.menuId;
  const newUserId = req.userId;
  const content = req.body.content;

  const menu = Menu.findById(menuId);
  if (!menu)
    return next(
      new AppError(404, "review not found", "Create New Review Error")
    );

  let review = await Review.create({
    menu: menuId,
    user: newUserId,
    content,
  });
  reviewCount = await Menu.findOneAndUpdate(
    { _id: menuId },
    { $inc: { reviewCount: 1 } },
    { new: true }
  );

  return sendResponse(
    res,
    200,
    true,
    review,
    null,
    "Create new Review successful"
  );
});

reviewController.getReviewsOfMenu = catchAsync(async (req, res, next) => {
  const menuId = req.params.menuId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const menu = Menu.findById(menuId);
  if (!menu)
    return next(new AppError(404, "Menu not found", "Find Review Error"));

  const totalReviews = await Review.countDocuments({ menu: menuId });
  const totalPages = Math.ceil(totalReviews / limit);
  const offset = limit * (page - 1);

  const reviews = await Review.find({ menu: menuId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user")
    .populate("menu");

  return sendResponse(res, 200, true, { reviews, totalPages }, null, "");
});

reviewController.updateSingleReview = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.id;
  const { content } = req.body;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    { content },
    { new: true }
  );

  if (!review)
    return next(
      new AppError(
        400,
        "Review not found or User not authorized",
        "Update Review Error"
      )
    );
  return sendResponse(res, 200, true, review, null, "Update successful");
});

reviewController.deleteSingleReview = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.id;

  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: userId,
  });
  reviewCount = await Menu.findOneAndUpdate(
    { _id: menuId },
    { $inc: { reviewCount: -1 } },
    { new: true }
  );
  if (!review)
    return next(
      new AppError(
        400,
        "Review not found or User not authorized",
        "Delete Review Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete successful");
});

module.exports = reviewController;
