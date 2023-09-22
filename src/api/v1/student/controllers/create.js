const { generateStudentId } = require("../../user/util");
const { createUser } = require("../../../../lib/user");
const studentService = require("../../../../lib/student");
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
    res.status(200).json({
      data: student,
      code: 201,
      message: "Student created successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = create;
