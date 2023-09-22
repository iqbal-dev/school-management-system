const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");
const adminService = require("../../../../lib/admin");
const findAllItems = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    // data
    const admins = await adminService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });
    const data = query.getTransformedItems({
      items: admins,
      selection: [],
      path: "/admins",
    });
    // pagination
    const totalItems = await adminService.count({ search });
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
