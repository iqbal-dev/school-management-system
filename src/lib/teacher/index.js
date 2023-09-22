const { generateFacultyId } = require("../../api/v1/user/util");
const { Student, Teacher, User } = require("../../model");
const { generateHash } = require("../../utils/hashing");
const { createUser } = require("../user");
const defaults = require("../../config/defaults");
const routineService = require("../routine");
const { convertRoutine } = require("../../api/v1/routine/util");
const teacherService = require("../section");
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

  const teachers = await Teacher.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return teachers.map((teacher) => ({
    ...teacher._doc,
    id: teacher.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    name: { $regex: search, $options: "i" },
  };

  return Teacher.count(filter);
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
const findOneById = async (id) => {
  const teacher = await Teacher.findById(id);
  return teacher ? { ...teacher._doc, id: teacher._id } : false;
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
  const teacher = await Teacher.findOne({ id }).exec();
  if (!teacher) {
    const teacherId = await generateFacultyId();
    const teacher = await create({
      id: teacherId,
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
      id: teacherId,
      role: "teacher",
      userId: teacher.id,
      password: "12345",
    });
    return {
      data: teacher,
      code: 201,
    };
  }

  const payload = {
    id: teacher.id,
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

  teacher.overwrite(payload);
  await teacher.save();
  if (password) {
    password = await generateHash(password);
    await User.findOneAndUpdate(
      { id: teacher.id },
      { password, needsPasswordChange: false }
    );
  }

  return { data: { ...teacher._doc, id: teacher.id }, code: 200 };
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
  const teacher = await Teacher.findById(id);
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

const findSingleItem = async (id) => {
  if (!id) throw new Error("Id is required");
  const teacher = await Teacher.findOne({ _id: id });
  if (!teacher) {
    return false;
  }
  let routines = await routineService.routinesByTeacherId(id);
  routines = convertRoutine(routines);
  const sections = await teacherService.sectionsByTeacher(id);
  return {
    ...teacher._doc,
    id: teacher.id,
    sections: sections ?? [],
    routines,
  };
};

module.exports = {
  create,
  findOneById,
  updateOrCreate,
  findAllItems,
  count,
  findSingleItem,
  updateProperties,
};
