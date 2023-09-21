const { Schema, model } = require("mongoose");

const sectionSchema = new Schema(
  {
    day: {
      type: String,
      enum: [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursDay",
      ],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    classStart: {
      type: String,
      required: true,
    },
    classEnd: {
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
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
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
