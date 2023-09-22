const { Class } = require("../../model");

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
    className: { $regex: search, $options: "i" },
  };

  const classes = await Class.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return classes.map((classes) => ({
    ...classes._doc,
    id: classes.id,
  }));
};

const count = ({ search = "" }) => {
  const filter = {
    className: { $regex: search, $options: "i" },
  };

  return Class.count(filter);
};

const create = async ({ className }) => {
  const classes = await Class.create({ className });

  return { ...classes._doc, id: classes._id };
};
const findOneById = async (id) => {
  const classes = await Class.findById(id);
  return classes ? { ...classes._doc, id: classes._id } : false;
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
  findAllItems,
  count,
};
