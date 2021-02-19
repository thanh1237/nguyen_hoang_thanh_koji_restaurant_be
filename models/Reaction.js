const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema({
  userId: { type: Array },
  menuId: { type: Schema.ObjectId, required: true, ref: "Menu" },
});

module.exports = mongoose.model("Reaction", reactionSchema);
