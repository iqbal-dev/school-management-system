const { Subject } = require("../../model");

const defaults = require("../../config/defaults");
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    subjectName: { $regex: search, $options: "i" },
  };

  const subjects = await Subject.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return subjects.map((subject) => ({
    ...subject._doc,
    id: subject.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    subjectName: { $regex: search, $options: "i" },
  };

  return Subject.count(filter);
};

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
  findAllItems,
  count,
};
