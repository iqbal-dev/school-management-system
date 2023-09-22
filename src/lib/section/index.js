const { Class, Section } = require("../../model");
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
    sectionName: { $regex: search, $options: "i" },
  };

  const sections = await Section.find(filter)
    .populate({ path: "teacher", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return sections.map((section) => ({
    ...section._doc,
    id: section.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    sectionName: { $regex: search, $options: "i" },
  };

  return Section.count(filter);
};
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

const sectionsByTeacher = async (teacherId) => {
  if (!teacherId) throw new Error("Teacher id is required");
  let sections = await Section.find({ teacher: teacherId });
  sections = sections.map((section) => ({
    ...section._doc,
    id: section.id,
  }));
  return sections.length > 0 ? sections : false;
};
module.exports = {
  create,
  findOneById,
  updateOrCreate,
  findAllItems,
  count,
  sectionsByTeacher,
};
