const { generateStudentId } = require("../../user/util");
const { createUser, updateUserById } = require("../../../../lib/user");
const { createStudent } = require("../../../../lib/student");
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
    const student = await createStudent({
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
    const user = await createUser({
      id: studentId,
      role: "student",
      password: "12345678",
      student: student.id,
    });
    res.status(200).json({
      ...req.body,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = create;
