const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const menuSchema = Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  type: {
    type: String,
    default: "Food",
  },
  tableId: { type: Schema.Types.ObjectId, ref: "Table" },
  bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  reviewCount: { type: Number, default: 0 },
  reactionCount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
