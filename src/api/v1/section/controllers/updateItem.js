const { badRequest } = require("../../../../utils/error");

const sectionService = require("../../../../lib/section");
const teacherService = require("../../../../lib/teacher");
const classService = require("../../../../lib/class");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { sectionName, year, status, teacherId, classId } = req.body;

  try {
    const [teacher, classes] = await Promise.all([
      teacherService.findOneById(teacherId),
      classService.findOneById(classId),
    ]);
    if (!teacher || !classes) {
      throw badRequest("Invalid parameters");
    }
    const { data, code } = await sectionService.updateOrCreate(id, {
      sectionName,
      year,
      status,
      teacherId,
      classId,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Section updated successfully"
          : "Section created successfully",
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
