const User = require("../../model/User");
const defaults = require("../../config/defaults");
const { badRequest } = require("../../utils/error");

const findUserById = async (id) => {
  const user = await User.findOne({ id });
  return user ? user : false;
};

const updateUserById = async (id, updateData) => {
  const user = await User.findOneAndUpdate({ id }, { ...updateData });
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

/**
 *
 * @param {object} user
 * @param {string} [user.id] - user id
 * @param {string} [user.role] - user role
 * @param {string} [user.password] - user password
 * @returns
 */
const createUser = async ({ id, role, password, student }) => {
  if (!id || !password || !role) throw badRequest("Invalid parameters");

  const user = await User.create({ id, password, role, student });

  return { ...user._doc, id: user.id };
};

/**
 * Find all users
 * filtering
 * sorting
 * pagination
 * Admin access only
 * @param {Object} options - The options for querying users.
 * @param {number} [options.page=defaults.page] - The page number for pagination.
 * @param {number} [options.limit=defaults.limit] - The number of users per page.
 * @param {string} [options.sortType=defaults.sortType] - The sorting type.
 * @param {string} [options.sortBy=defaults.sortBy] - The field to sort by.
 * @param {string} [options.name=''] - Filter users by name.
 * @param {string} [options.email=''] - Filter users by email.
 * @returns {Promise<Object>} - A promise that resolves with the find all users data.
 */
const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const users = await User.find()
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return users.map((user) => ({
    ...user._doc,
    id: user.id,
  }));
};

/**
 * Count users based on provided filters.
 * @param {Object} filters - The filters for counting users.
 * @returns {Promise<number>} - A promise that resolves with the count of matching users.
 */
const count = async () => {
  return User.count(filter);
};

/**
 * Create a new user with the provided information.
 * Admin access only
 * @param {Object} userData - The data for creating a new user.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves with the created user's data, including the generated id.
 * @throws {Error} Throws an error if any of the required parameters (name, email, password) are missing.
 */
const create = async ({
  name,
  email,
  password,
  role = "user",
  status = "pending",
}) => {
  if (!name || !email || !password) throw badRequest("Invalid parameters");

  const user = new User({ name, email, password, role, status });
  await user.save();

  return { ...user._doc, id: user.id };
};

module.exports = {
  userExist,
  findUserById,
  createUser,
  updateUserById,
  findAllItems,
  create,
  count,
};
