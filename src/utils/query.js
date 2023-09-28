const defaults = require("../config/defaults");
const { generateQueryString } = require("./qs");

/**
 * Get pagination information based on the provided parameters.
 *
 * @param {object} params - The pagination parameters.
 * @param {number} [params.totalItems] - The total number of items.
 * @param {number} [params.limit] - The number of items per page.
 * @param {number} [params.page] - The current page number.
 * @returns {object} Pagination information.
 */
const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

/**
 * Generate HATEOAS (Hypermedia as the Engine of Application State) links for a paginated list of items.
 *
 * @param {object} params - The parameters for generating HATEOAS links.
 * @param {string} [params.url="/"] - The base URL.
 * @param {string} [params.path=""] - The path for the current resource.
 * @param {object} [params.query={}] - The query parameters for the current resource.
 * @param {boolean} [params.hasNext=false] - Indicates if there is a next page.
 * @param {boolean} [params.hasPrev=false] - Indicates if there is a previous page.
 * @param {number} [params.page=1] - The current page number.
 * @returns {object} HATEOAS links for the current resource.
 */

const getHATEOASForAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryStr}`;
  }
  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links.prev = `${path}?${queryStr}`;
  }

  return links;
};
/**
 * Transform an array of items by selecting specific properties and adding a link to each item.
 *
 * @param {object} params - The parameters for transforming items.
 * @param {Array} [params.items=[]] - The array of items to be transformed.
 * @param {Array} [params.selection=[]] - An array of property names to be selected from each item.
 * @param {string} [params.path="/"] - The base path for generating item links.
 * @returns {Array} Transformed items with selected properties and links.
 * @throws {Error} If `items` or `selection` is not an array.
 */
const getTransformedItems = ({ items = [], selection = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid selection");
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
  }

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;
    return result;
  });
};

module.exports = {
  getPagination,
  getTransformedItems,
  getHATEOASForAllItems,
};
