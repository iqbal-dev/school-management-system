const studentService = require("../../../../lib/student");
const sectionService = require("../../../../lib/section");
const classService = require("../../../../lib/class");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { className } = req.body;

  try {
    const { data, code } = await classService.updateOrCreate(id, {
      className,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Class updated successfully"
          : "Class created successfully",
      data,
      links: {
        self: `/classes/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
