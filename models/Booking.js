const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const bookingSchema = Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  tableId: { type: Schema.Types.ObjectId, required: true, ref: "Table" },
  isDeleted: { type: Boolean, default: false },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
