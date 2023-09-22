const { Schema, model } = require("mongoose");

const sectionSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
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

const Section = model("Section", sectionSchema);
module.exports = Section;
