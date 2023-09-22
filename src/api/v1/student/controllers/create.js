const { generateStudentId } = require("../../user/util");
const { createUser } = require("../../../../lib/user");
const studentService = require("../../../../lib/student");
const sectionService = require("../../../../lib/section");
const classService = require("../../../../lib/class");
const { badRequest } = require("../../../../utils/error");
const create = async (req, res, next) => {
  const {
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
  } = req.body;
  const {
    fatherName,
    fatherOccupation,
    fatherContactNo,
    motherName,
    motherOccupation,
    motherContactNo,
    address,
  } = guardian;
  const {
    name: localGuardianName,
    occupation,
    contactNo: localGuardianContact,
    address: localGuardianAddress,
  } = localGuardian;

  try {
    const [classes, section] = await Promise.all([
      sectionService.findOneById(sectionId),
      classService.findOneById(classId),
    ]);
    console.log("====================================");
    console.log({ classes, section });
    console.log("====================================");
    if (!classes || !section) {
      throw badRequest("Invalid parameters");
    }
    const studentId = await generateStudentId();
    const student = await studentService.create({
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
      classId,
      sectionId,
      guardian: {
        fatherName,
        fatherOccupation,
        fatherContactNo,
        motherName,
        motherOccupation,
        motherContactNo,
        address,
      },
      localGuardian: {
        name: localGuardianName,
        occupation,
        contactNo: localGuardianContact,
        address: localGuardianAddress,
      },
    });
    await createUser({
      id: studentId,
      role: "student",
      password: "12345678",
      userId: student.id,
    });
    res.status(201).json({
      data: student,
      code: 201,
      message: "Student created successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = create;
