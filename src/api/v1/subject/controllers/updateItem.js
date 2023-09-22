const studentService = require("../../../../lib/student");
const sectionService = require("../../../../lib/section");
const subjectService = require("../../../../lib/subject");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { subjectName } = req.body;

  try {
    const { data, code } = await subjectService.updateOrCreate(id, {
      subjectName,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Subject updated successfully"
          : "Subject created successfully",
      data,
      links: {
        self: `/subjects/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
