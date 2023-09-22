const adminService = require("../../../../lib/admin");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
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
    password,
  } = req.body;
  try {
    const { data, code } = await adminService.updateOrCreate(id, {
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
    });
    const response = {
      code,
      message:
        code === 200
          ? "Admin updated successfully"
          : "Admin created successfully",
      data,
      links: {
        self: `/admins/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
