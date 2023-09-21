const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
  {
    subjectName: {
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

const Subject = model("Subject", subjectSchema);
module.exports = Subject;
