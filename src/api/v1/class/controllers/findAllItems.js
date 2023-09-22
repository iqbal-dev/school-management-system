const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");
const classService = require("../../../../lib/class");
const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    // data
    const classes = await classService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });
    const data = query.getTransformedItems({
      items: classes,
      selection: [],
      path: "/classes",
    });
    // pagination
    const totalItems = await classService.count({ search });
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
