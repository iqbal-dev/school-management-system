const Student = require("../../model/Student");

const createStudent = async ({
  id,
  name,
  gender,
  dob,
  email,
  contactNo,
  emergencyContactNo,
  bloodGroup,
  presentAddress,
  permanentAddress,
  guardian,
  localGuardian,
}) => {
  const student = await Student.create({
    id,
    name,
    gender,
    dob,
    email,
    contactNo,
    emergencyContactNo,
    bloodGroup,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
  });

  return { ...student._doc, id: student._id };
};
module.exports = {
  createStudent,
};
