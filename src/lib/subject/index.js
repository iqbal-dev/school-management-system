const { Subject } = require("../../model");

const create = async ({ subjectName }) => {
  const subject = await Subject.create({ subjectName });

  return { ...subject._doc, id: subject._id };
};
const findOneById = async (id) => {
  const subject = await Subject.findById(id);

  return subject ? { ...subject._doc, id: subject._id } : false;
};

module.exports = {
  create,
  findOneById,
};
