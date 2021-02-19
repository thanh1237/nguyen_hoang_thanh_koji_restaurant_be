const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Reaction = require("../models/reaction");
const Menu = require("../models/Menu");
const reactionController = {};

reactionController.createReaction = catchAsync(async (req, res, next) => {
  // if (currentUser.role != "admin")
  //   return next(new AppError(400, "Admin Required", "Create Table Error"));
  const menuId = req.body.menuId;
  const newUserId = req.userId;
  let reaction = await Reaction.find({ menuId: menuId });
  let countReaction;
  let update;

  reaction[0] === undefined
    ? (reaction = await Reaction.create({
        menuId,
        userId: [newUserId],
      }))
    : reaction[0] !== undefined
    ? reaction[0].userId.includes(newUserId) === false
      ? ((reactionCount = await Menu.findOneAndUpdate(
          { _id: menuId },
          { $inc: { reactionCount: 1 } },
          { new: true }
        )),
        (reaction = await Reaction.findOneAndUpdate(
          { _id: reaction[0]._id },
          (update = { userId: [...reaction[0].userId, newUserId] }),
          {
            new: true,
          }
        )))
      : reaction[0].userId.includes(newUserId) === true
      ? ((reactionCount = await Menu.findOneAndUpdate(
          { _id: menuId },
          { $inc: { reactionCount: -1 } },
          { new: true }
        )),
        (reaction = await Reaction.findOneAndUpdate(
          { _id: reaction[0]._id },
          { userId: reaction[0].userId.filter((el) => el !== newUserId) },
          {
            new: true,
          }
        )))
      : null
    : null;

  return sendResponse(
    res,
    200,
    true,
    reaction,
    null,
    "Create new Reaction successful"
  );
});

reactionController.getSingleReaction = catchAsync(async (req, res, next) => {
  const menuId = req.params.menuId;
  let reaction = await Reaction.findOne({ menuId: req.params.menuId });
  const newUserId = req.userId;
  if (!reaction) {
    reaction = await Reaction.create({
      menuId,
      userId: [newUserId],
    });
    return sendResponse(res, 200, true, reaction, null, null);
  }
  reaction = reaction.toJSON();
  return sendResponse(res, 200, true, reaction, null, null);
});

module.exports = reactionController;
