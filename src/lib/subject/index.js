const { Subject } = require("../../model");

const create = async ({ subjectName }) => {
  const subject = await Subject.create({ subjectName });

  return { ...subject._doc, id: subject._id };
};
const findOneById = async (id) => {
  const subject = await Subject.findById(id);

  return subject ? { ...subject._doc, id: subject._id } : false;
};

const updateOrCreate = async (id, { subjectName }) => {
  const subject = await Subject.findOne({ _id: id }).exec();
  if (!subject) {
    const subject = await create({
      subjectName,
    });
    return {
      data: subject,
      code: 201,
    };
  }

  const payload = {
    subjectName,
  };

  subject.overwrite(payload);
  await subject.save();
  return { data: { ...subject._doc, id: subject.id }, code: 200 };
};

module.exports = {
  create,
  findOneById,
  updateOrCreate,
};
