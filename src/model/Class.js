const { Schema, model } = require("mongoose");

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Class = model("Class", classSchema);
module.exports = Class;
