const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weather: {
    minTemp: {
      type: Number,
      default: 0,
    },
    maxTemp: {
      type: Number,
      default: 0,
    },
    wind: {
      type: Number,
      default: 0,
    },
  },
  imgSrc: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("records", recordSchema);
