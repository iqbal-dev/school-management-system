const { generateStudentId } = require("../../api/v1/user/util");
const { User } = require("../../model");
const Student = require("../../model/Student");
const { generateHash } = require("../../utils/hashing");
const { createUser } = require("../user");

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
  };

  student.overwrite(payload);
  await student.save();
  if (password) {
    const password = await generateHash(password);
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
};
