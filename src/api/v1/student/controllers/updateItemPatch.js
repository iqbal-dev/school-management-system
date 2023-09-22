const studentService = require("../../../../lib/student");
const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await studentService.updateProperties(id, req.body);

    const response = {
      code: 200,
      message: "Student updated successfully",
      data: student,
      links: {
        self: `/Students/${student.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = updateItemPatch;
