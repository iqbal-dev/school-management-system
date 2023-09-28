const { generateQueryString } = require("../../src/utils/qs");
const {
  getPagination,
  getHATEOASForAllItems,
} = require("../../src/utils/query");

describe("get Pagination", () => {
  it("should return calculated pagination", () => {
    const totalItems = 20;
    const limit = 5;
    const page = 3;

    const pagination = getPagination({ totalItems, limit, page });
    expect(pagination.totalItems).toBe(20);
    expect(pagination.totalPage).toBe(4);
    expect(pagination.limit).toBe(5);
    expect(pagination.page).toBe(3);
  });
  it("generate query  string", () => {
    const query = { updatedAt: "DESC", search: "iqbal" };
    const queryString = generateQueryString(query);
    expect(queryString).toBe("updatedAt=DESC&search=iqbal");
  });
});
describe("getHATEOASForAllItems", () => {
  it("generates HATEOAS links correctly", () => {
    const url = "/students";
    const path = "api/v1";
    const query = { updatedAt: "DESC" };
    const hasNext = true;
    const hasPrev = true;
    const page = 3;
    const hateoas = getHATEOASForAllItems({
      url,
      path,
      query,
      hasNext,
      hasPrev,
      page,
    });
    expect(hateoas.self).toBe(url);
    expect(hateoas.next).toBe(`${path}?updatedAt=DESC&page=4`);
    expect(hateoas.prev).toBe(`${path}?updatedAt=DESC&page=2`);
  });

  it("handles no next links correctly", () => {
    const url = "/students";
    const path = "api/v1";
    const query = {};
    const hasNext = false;
    const hasPrev = true;
    const page = 2;
    const hateoas = getHATEOASForAllItems({
      url,
      path,
      query,
      hasNext,
      hasPrev,
      page,
    });
    expect(hateoas.self).toBe(url);
    expect(hateoas.next).toBeUndefined();
    expect(hateoas.prev).toBe(`${path}?page=1`);
  });
  it("handles  next no prev links correctly", () => {
    const url = "/students";
    const path = "api/v1";
    const query = {};
    const hasNext = true;
    const hasPrev = false;
    const page = 2;
    const hateoas = getHATEOASForAllItems({
      url,
      path,
      query,
      hasNext,
      hasPrev,
      page,
    });
    expect(hateoas.self).toBe(url);
    expect(hateoas.next).toBe(`${path}?page=3`);
    expect(hateoas.prev).toBeUndefined;
  });
  it("handles no next or prev links correctly", () => {
    const url = "/students";
    const path = "api/v1";
    const query = {};
    const hasNext = false;
    const hasPrev = false;
    const page = 1;
    const hateoas = getHATEOASForAllItems({
      url,
      path,
      query,
      hasNext,
      hasPrev,
      page,
    });
    expect(hateoas.self).toBe(url);
    expect(hateoas.next).toBeUndefined();
    expect(hateoas.prev).toBeUndefined();
  });
});
