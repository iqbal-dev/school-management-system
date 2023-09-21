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
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
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
