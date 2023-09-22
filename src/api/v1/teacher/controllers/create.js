const { generateStudentId, generateFacultyId } = require("../../user/util");
const { createUser } = require("../../../../lib/user");
const teacherService = require("../../../../lib/teacher");
const create = async (req, res, next) => {
  const {
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
    password = "12345678",
  } = req.body;

  try {
    const teacherId = await generateFacultyId();
    const teacher = await teacherService.create({
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
      password,
      teacher: teacher.id,
    });
    res.status(200).json({
      code: 200,
      message: " Teacher created Successfully",
      data: teacher,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = create;
