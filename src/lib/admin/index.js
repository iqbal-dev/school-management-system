const { generateAdminId } = require("../../api/v1/user/util");
const { Student, Admin, User } = require("../../model");
const { generateHash } = require("../../utils/hashing");
const { createUser } = require("../user");

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

const updateOrCreate = async (
  id,
  {
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
  }
) => {
  const admin = await Admin.findOne({ id }).exec();
  if (!admin) {
    const adminId = await generateAdminId();
    const admin = await create({
      id: adminId,
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
    await createUser({
      id: adminId,
      role: "admin",
      userId: admin.id,
      password: "12345",
    });
    return {
      data: admin,
      code: 201,
    };
  }

  const payload = {
    id: admin.id,
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
  };

  admin.overwrite(payload);
  await admin.save();
  if (password) {
    const password = await generateHash(password);
    await User.findOneAndUpdate(
      { id: admin.id },
      { password, needsPasswordChange: false }
    );
  }
  return { data: { ...admin._doc, id: admin.id }, code: 200 };
};

module.exports = {
  create,
  updateOrCreate,
};
