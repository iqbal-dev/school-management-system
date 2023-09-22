const { Class, Routine } = require("../../model");

const defaults = require("../../config/defaults");
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  classes = defaults.class,
  section = defaults.section,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const isClasses = classes ? { class: classes } : {};
  const isSections = section ? { section } : {};
  const filter = {
    ...isClasses,
    ...isSections,
  };

  const routines = await Routine.find(filter)
    .populate({ path: "teacher", select: "name" })
    .populate({ path: "subject", select: "subjectName" })
    .populate({ path: "section", select: "sectionName" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return routines.map((routine) => ({
    ...routine._doc,
    id: routine.id,
  }));
};

const count = ({ classes = defaults.class, section = defaults.section }) => {
  const isClasses = classes ? { class: classes } : {};
  const isSections = section ? { section } : {};
  const filter = {
    ...isClasses,
    ...isSections,
  };

  return Routine.count(filter);
};

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
  findAllItems,
  count,
};
