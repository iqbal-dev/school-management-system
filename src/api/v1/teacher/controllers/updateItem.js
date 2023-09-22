const teacherService = require("../../../../lib/teacher");
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
  } = req.body;
  try {
    const { data, code } = await teacherService.updateOrCreate(id, {
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
    const response = {
      code,
      message:
        code === 200
          ? "Teacher updated successfully"
          : "Teacher created successfully",
      data,
      links: {
        self: `/teachers/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
