const { badRequest } = require("../../../../utils/error");

const sectionService = require("../../../../lib/section");
const teacherService = require("../../../../lib/teacher");
const classService = require("../../../../lib/class");
const create = async (req, res, next) => {
  const { sectionName, classId, teacherId, year, status } = req.body;
  try {
    const [teacher, classes] = await Promise.all([
      teacherService.findOneById(teacherId),
      classService.findOneById(classId),
    ]);
    if (!teacher || !classes) {
      throw badRequest("Invalid parameters");
    }
    const section = await sectionService.create({
      sectionName,
      teacherId,
      classId,
      year,
      status,
    });
    res.status(201).json({
      code: 201,
      message: "Successfully section created",
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
