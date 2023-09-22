const teacherService = require("../../../../lib/teacher");
const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await teacherService.updateProperties(id, req.body);

    const response = {
      code: 200,
      message: "Teacher updated successfully",
      data: teacher,
      links: {
        self: `/teachers/${teacher.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = updateItemPatch;
