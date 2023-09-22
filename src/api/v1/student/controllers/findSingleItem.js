const studentService = require("../../../../lib/student");
const { badRequest } = require("../../../../utils/error");
const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await studentService.findSingleItem(id);
    if (!student) {
      throw badRequest("Invalid student id");
    }
    const response = {
      data: student,
      links: {
        self: "/students/1",
        section: `student/1/section/${student.section.id}`,
        class: `student/1/class/${student.class.id}`,
      },
      code: 200,
      message: "Successfully fetched",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
