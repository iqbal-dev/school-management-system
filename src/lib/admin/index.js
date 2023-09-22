const { generateAdminId } = require("../../api/v1/user/util");
const { Student, Admin, User } = require("../../model");
const { generateHash } = require("../../utils/hashing");
const { createUser } = require("../user");
const defaults = require("../../config/defaults");
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  const admins = await Admin.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return admins.map((admin) => ({
    ...admin._doc,
    id: admin.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  return Admin.count(filter);
};

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
    password,
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
    password = await generateHash(password);
    await User.findOneAndUpdate(
      { id: admin.id },
      { password, needsPasswordChange: false }
    );
  }
  return { data: { ...admin._doc, id: admin.id }, code: 200 };
};

const updateProperties = async (
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
  const teacher = await Admin.findById(id);
  if (!teacher) {
    throw notFound();
  }

  const payload = {
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

  Object.keys(payload).forEach((key) => {
    teacher[key] = payload[key] ?? teacher[key];
  });

  await teacher.save();
  return { ...teacher._doc, id: teacher.id };
};

module.exports = {
  create,
  updateOrCreate,
  findAllItems,
  count,
  updateProperties,
};
