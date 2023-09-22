const { badRequest } = require("../../../../utils/error");

const routineService = require("../../../../lib/routine");
const teacherService = require("../../../../lib/teacher");
const subjectService = require("../../../../lib/subject");
const sectionService = require("../../../../lib/section");
const create = async (req, res, next) => {
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
    console.log("====================================");
    console.log({ teacher, section, subject });
    console.log("====================================");
    if (!teacher || !subject || !section) {
      throw badRequest("Invalid parameters");
    }
    const routine = await routineService.create({
      day,
      teacherId,
      subjectId,
      sectionId,
      startTime,
      endTime,
      status,
      year,
    });
    res.status(201).json({
      code: 201,
      message: "Successfully routine created",
      data: routine,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
