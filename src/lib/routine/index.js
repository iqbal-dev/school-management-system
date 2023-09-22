const { Class, Section, Routine } = require("../../model");

const create = async ({
  day,
  teacherId,
  subjectId,
  sectionId,
  startTime,
  endTime,
  status,
  year,
}) => {
  const routine = await Routine.create({
    day,
    teacher: teacherId,
    subject: subjectId,
    startTime,
    endTime,
    status,
    year,
    section: sectionId,
  });

  return { ...routine._doc, id: routine._id };
};

module.exports = {
  create,
};
