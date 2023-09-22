const { generateStudentId } = require("../../api/v1/user/util");
const { User } = require("../../model");
const Student = require("../../model/Student");
const { generateHash } = require("../../utils/hashing");
const { createUser } = require("../user");
const defaults = require("../../config/defaults");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  classes = defaults.class,
  section = defaults.section,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const isClasses = classes ? { class: classes } : {};
  const isSections = section ? { section } : {};
  const filter = {
    name: { $regex: search, $options: "i" },
    ...isClasses,
    ...isSections,
  };

  const students = await Student.find(filter)
    .populate({ path: "class", select: "className" })
    .populate({ path: "section", select: "sectionName" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return students.map((student) => ({
    ...student._doc,
    id: student.id,
  }));
};

const count = ({
  search = "",
  classes = defaults.class,
  section = defaults.section,
}) => {
  const isClasses = classes ? { class: classes } : {};
  const isSections = section ? { section } : {};
  const filter = {
    name: { $regex: search, $options: "i" },
    ...isClasses,
    ...isSections,
  };

  return Student.count(filter);
};

const create = async ({
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
  classId,
  sectionId,
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

    class: classId,
    section: sectionId,
  });

  return { ...student._doc, id: student._id };
};

const updateOrCreate = async (
  id,
  {
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
    classId,
    sectionId,
    password,
  }
) => {
  const student = await Student.findOne({ id }).exec();
  if (!student) {
    const studentId = await generateStudentId();
    const student = await create({
      id: studentId,
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
      classId,
      sectionId,
    });
    await createUser({
      id: studentId,
      role: "student",
      userId: student.id,
      password: "12345",
    });
    return {
      data: student,
      code: 201,
    };
  }

  const payload = {
    id: student.id,
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
    class: classId,
    section: sectionId,
    password,
  };

  student.overwrite(payload);
  await student.save();
  if (password) {
    password = await generateHash(password);
    await User.findOneAndUpdate(
      { id: student.id },
      { password, needsPasswordChange: false }
    );
  }
  return { data: { ...student._doc, id: student.id }, code: 200 };
};
module.exports = {
  create,
  updateOrCreate,
  findAllItems,
  count,
};
