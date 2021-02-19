const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  menu: { type: Schema.Types.ObjectId, required: true, ref: "Menu" },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
