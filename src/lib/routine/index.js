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
const updateOrCreate = async (
  id,
  { day, teacherId, subjectId, sectionId, startTime, endTime, status, year }
) => {
  const routine = await Routine.findOne({ _id: id }).exec();
  if (!routine) {
    const routine = await create({
      day,
      teacherId,
      subjectId,
      startTime,
      endTime,
      status,
      year,
      sectionId,
    });
    return {
      data: routine,
      code: 201,
    };
  }

  const payload = {
    day,
    teacher: teacherId,
    subject: subjectId,
    startTime,
    endTime,
    status,
    year,
    section: sectionId,
  };

  routine.overwrite(payload);
  await routine.save();
  return { data: { ...routine._doc, id: routine.id }, code: 200 };
};
module.exports = {
  create,
  updateOrCreate,
};
