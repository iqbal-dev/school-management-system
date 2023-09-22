const { Schema, model } = require("mongoose");
const { gender, bloodGroup } = require("../utils/constant");

const teacherSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
      required: true,
    },
    profileImage: {
      type: String,
    },
    dob: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    designation: {
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

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
