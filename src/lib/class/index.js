const { Class } = require("../../model");

const create = async ({ className }) => {
  const classes = await Class.create({ className });

  return { ...classes._doc, id: classes._id };
};
const findOneById = async (id) => {
  const teacher = await Class.findById(id);
  return teacher ? { ...teacher._doc, id: teacher._id } : false;
};
const updateOrCreate = async (id, { className }) => {
  const classes = await Class.findOne({ _id: id }).exec();
  if (!classes) {
    const classes = await create({
      className,
    });
    return {
      data: classes,
      code: 201,
    };
  }

  const payload = {
    className,
  };

  classes.overwrite(payload);
  await classes.save();
  return { data: { ...classes._doc, id: classes.id }, code: 200 };
};

module.exports = {
  create,
  findOneById,
  updateOrCreate,
};
