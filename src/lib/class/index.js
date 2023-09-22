const { Class } = require("../../model");

const create = async ({ className }) => {
  const classes = await Class.create({ className });

  return { ...classes._doc, id: classes._id };
};
const findOneById = async (id) => {
  const teacher = await Class.findById(id);
  return teacher ? { ...teacher._doc, id: teacher._id } : false;
};

module.exports = {
  create,
  findOneById,
};
