const { Student, Teacher } = require("../../model");

const create = async ({
  id,
  name,
  gender,
  dob,
  email,
  phone,
  emergencyContactNo,
  bloodGroup,
  presentAddress,
  permanentAddress,
  designation,
}) => {
  const teacher = await Teacher.create({
    id,
    name,
    gender,
    dob,
    email,
    phone,
    emergencyContactNo,
    bloodGroup,
    presentAddress,
    permanentAddress,
    designation,
  });

  return { ...teacher._doc, id: teacher._id };
};

module.exports = {
  create,
};
