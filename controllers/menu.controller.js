const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Menu = require("../models/Menu");
const Formidable = require("formidable");
const cloudinary = require("cloudinary");

const menuController = {};

menuController.getMenu = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  //filter avai/pending/confirm/cancel

  let status = filter.filter;
  const totalMenu = await Menu.countDocuments({
    ...filter,
    isDeleted: true,
  })
    .populate("user")
    .populate("tableId")
    .populate("bookingId");

  const menu = await Menu.find().sort({ ...sortBy, createdAt: -1 });

  return sendResponse(res, 200, true, { menu }, null, "");
});

menuController.createMenu = catchAsync(async (req, res, next) => {
  // if (currentUser.role != "admin")
  //   return next(new AppError(400, "Admin Required", "Create Table Error"));
  const name = req.body.name;
  const type = req.body.type;
  const price = req.body.price;
  const image = req.body.image;
  const menu = await Menu.create({
    name,
    type,
    price,
    image,
  });

  return sendResponse(res, 200, true, menu, null, "Create new Item successful");
});

menuController.getSingleDish = catchAsync(async (req, res, next) => {
  let dish = await Menu.findById(req.params.id);
  if (!dish)
    return next(new AppError(404, "Table not found", "Get Single dish Error"));
  dish = dish.toJSON();
  return sendResponse(res, 200, true, dish, null, null);
});

menuController.updateMenu = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const dishId = req.params.id;
  const type = req.body.type;
  const price = req.body.price;
  const dish = await Menu.findOneAndUpdate(
    { _id: dishId },
    { name, type, price }
  );
  if (!dish)
    return next(new AppError(400, "Dish not found", "Update Menu Error"));
  return sendResponse(res, 200, true, dish, null, "Update Menu  successful");
});

menuController.deleteDish = catchAsync(async (req, res, next) => {
  const menuId = req.params.id;

  const menu = await Menu.findOneAndUpdate(
    { _id: menuId },
    { isDeleted: true }
  );
  if (!menu)
    return next(new AppError(400, "Dish not found", "Delete Dish Error"));
  return sendResponse(res, 200, true, null, null, "Delete dish successful");
});

module.exports = menuController;
