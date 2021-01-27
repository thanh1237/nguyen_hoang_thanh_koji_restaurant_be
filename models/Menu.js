const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const menuSchema = Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: String, required: true },
  type: {
    type: String,
    default: "Food",
    enum: ["Food", "Drink"],
  },
  tableId: { type: Schema.Types.ObjectId, ref: "Table" },
  bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
