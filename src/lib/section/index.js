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
module.exports = {
  create,
  findOneById,
};
