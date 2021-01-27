const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Table = require("../models/Table");
const User = require("../models/User");

const tableController = {};
const time = [
  "11:00",
  "12:00",
  "13:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
tableController.selectDate = catchAsync(async (req, res, next) => {
  const user = req.userId;
  const currentUser = await User.findOne({ _id: user });
  const date = req.body.date;
  let message = "";
  let datedTableList = await Table.find({ date: date });

  if (datedTableList.length != 0) {
    message = "Dated table list";
  } else {
    for (let z = 0; z < time.length; z++) {
      for (let i = 0; i < 7; i++) {
        let random = await Table.create({
          date,
          time: time[z],
          tableName: `T${i + 1}`,
        });
      }
    }
    datedTableList = await Table.find({ date: date });

    message = "create new table list ";
  }

  return sendResponse(res, 200, true, datedTableList, null, message);
});

tableController.getListOfTable = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  //filter avai/pending/confirm/cancel

  let status = filter.filter;
  const totalTables = await Table.countDocuments({
    ...filter,
    isDeleted: true,
  });

  const tables = await Table.find().sort({ ...sortBy, createdAt: -1 });

  return sendResponse(res, 200, true, { tables }, null, "");
});

tableController.getSingleTable = catchAsync(async (req, res, next) => {
  let table = await Table.findById(req.params.id);
  if (!table)
    return next(new AppError(404, "Table not found", "Get Single Table Error"));
  table = table.toJSON();
  return sendResponse(res, 200, true, table, null, null);
});

tableController.updateSingleTable = catchAsync(async (req, res, next) => {
  const tableId = req.params.id;
  const status = req.body.status;
  const comment = req.body.comment;
  const date = req.body.date;
  const table = await Table.findOneAndUpdate(
    { _id: tableId },
    {
      date,
      comment,
      status,
    }
  );
  if (!table)
    return next(
      new AppError(
        400,
        "Table not found or User not authorized",
        "Update Table Error"
      )
    );
  return sendResponse(res, 200, true, table, null, "Update Table successful");
});

tableController.deleteSingleTable = catchAsync(async (req, res, next) => {
  const tableId = req.params.id;

  const table = await Table.findOneAndUpdate(
    { _id: tableId },
    { isDeleted: true },
    { new: true }
  );
  if (!table)
    return next(
      new AppError(
        400,
        "Table not found or User not authorized",
        "Delete Table Error"
      )
    );
  return sendResponse(res, 200, true, null, null, "Delete table successful");
});

module.exports = tableController;
