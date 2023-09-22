const { badRequest } = require("../../../../utils/error");

const routineService = require("../../../../lib/routine");
const teacherService = require("../../../../lib/teacher");
const subjectService = require("../../../../lib/subject");
const sectionService = require("../../../../lib/section");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const {
    day,
    teacherId,
    subjectId,
    sectionId,
    startTime,
    endTime,
    status = "active",
    year,
  } = req.body;
  try {
    const [teacher, section, subject] = await Promise.all([
      teacherService.findOneById(teacherId),
      sectionService.findOneById(sectionId),
      subjectService.findOneById(subjectId),
    ]);
    if (!teacher || !subject || !section) {
      throw badRequest("Invalid parameters");
    }
    const { data, code } = await routineService.updateOrCreate(id, {
      day,
      teacherId,
      subjectId,
      sectionId,
      startTime,
      endTime,
      status,
      year,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Routine updated successfully"
          : "Routine created successfully",
      data,
      links: {
        self: `/routines/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
