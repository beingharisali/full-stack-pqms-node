const mongoose = require("mongoose");
const docterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 100,
  },
  specialization: {
    type: String,
    required: [true, "Please provide specialization"],
    maxlength: 100,
  },
  availability: {
    type: String,
    required: [true, "Please provide availability"],
  },
});
const Docter = mongoose.model("Docter", docterSchema);
module.exports = Docter;
