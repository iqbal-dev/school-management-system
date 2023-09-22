const { Class, Section } = require("../../model");

const create = async ({
  sectionName,
  year,
  status = "active",
  teacherId,
  classId,
}) => {
  const section = await Section.create({
    sectionName,
    year,
    status,
    teacher: teacherId,
    class: classId,
  });

  return { ...section._doc, id: section._id };
};
const findOneById = async (id) => {
  const section = await Section.findById(id);

  return section ? { ...section._doc, id: section._id } : false;
};

const updateOrCreate = async (
  id,
  { sectionName, year, status, teacherId, classId }
) => {
  const section = await Section.findOne({ _id: id }).exec();
  if (!section) {
    const section = await create({
      sectionName,
      year,
      status,
      teacher: teacherId,
      class: classId,
    });
    return {
      data: section,
      code: 201,
    };
  }

  const payload = {
    sectionName,
    year,
    status,
    teacher: teacherId,
    class: classId,
  };

  section.overwrite(payload);
  await section.save();
  return { data: { ...section._doc, id: section.id }, code: 200 };
};
module.exports = {
  create,
  findOneById,
  updateOrCreate,
};
