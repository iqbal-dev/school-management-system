const { Schema, Model, model } = require("mongoose");
const { bloodGroup, gender } = require("../utils/constant");

const studentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        enum: gender,
        required: true,
      },
      dob: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      contactNo: {
        type: String,
        unique: true,
        required: true,
      },
      emergencyContactNo: {
        type: String,
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: bloodGroup,
      },
      presentAddress: {
        type: String,
        required: true,
      },
      permanentAddress: {
        type: String,
        required: true,
      },
      guardian: {
        required: true,
        type: {
          fatherName: {
            type: String,
            required: true,
          },
          fatherOccupation: {
            type: String,
            required: true,
          },
          fatherContactNo: {
            type: String,
            required: true,
          },
          motherName: {
            type: String,
            required: true,
          },
          motherOccupation: {
            type: String,
            required: true,
          },
          motherContactNo: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
        },
      },
      localGuardian: {
        required: true,
        type: {
          name: {
            type: String,
            required: true,
          },
          occupation: {
            type: String,
            required: true,
          },
          contactNo: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
        },
      },
      class: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true,
      },
      section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
        required: true,
      },
      profileImage: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Student = model("Student", studentSchema);
module.exports = Student;
