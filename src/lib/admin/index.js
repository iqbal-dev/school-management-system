const { Student, Admin } = require("../../model");

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
  const admin = await Admin.create({
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

  return { ...admin._doc, id: admin._id };
};

module.exports = {
  create,
};
