const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");
const studentService = require("../../../../lib/student");
const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const classes = req.query.class || defaults.class;
  const section = req.query.section || defaults.section;

  try {
    // data
    const students = await studentService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      classes,
      section,
    });
    const data = query.getTransformedItems({
      items: students,
      selection: [],
      path: "/students",
    });
    // pagination
    const totalItems = await studentService.count({ search, classes, section });
    const pagination = query.getPagination({ totalItems, limit, page });
    // HATEOAS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllItems;
