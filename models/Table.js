const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const tableSchema = Schema({
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
    enum: ["Available", "Booked", "Pending"],
  },
  tableName: { type: String },
  isDeleted: false,
  comment: { type: String, required: false },
  time: {
    type: String,
    required: true,
    default: "11:30 - 13:00",
    enum: [
      "11:00",
      "12:00",
      "13:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
  },
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
