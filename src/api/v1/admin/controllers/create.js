const {
  generateStudentId,
  generateFacultyId,
  generateAdminId,
} = require("../../user/util");
const { createUser } = require("../../../../lib/user");
const adminService = require("../../../../lib/admin");
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
    const adminId = await generateAdminId();
    const admin = await adminService.create({
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
    const user = await createUser({
      id: adminId,
      role: "admin",
      password,
      userId: admin.id,
    });
    res.status(201).json({
      data: admin,
      code: 201,
      message: "Admin created successfully",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = create;
