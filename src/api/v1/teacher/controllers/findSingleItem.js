const teacherService = require("../../../../lib/teacher");
const { badRequest } = require("../../../../utils/error");
const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await teacherService.findSingleItem(id);
    if (!teacher) {
      throw badRequest("Invalid student id");
    }

    const response = {
      data: teacher,
      code: 200,
      links: {
        self: `/teacher/${id}`,
        section: `/teacher/${id}/section`,
        routine: `/teacher/${id}/routines`,
      },
      message: "Student Successfully fetched",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
