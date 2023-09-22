const userService = require("../user");
const { badRequest } = require("../../utils/error");
const { generateToken } = require("../token");
const { hashMatched } = require("../../utils/hashing");
const { User } = require("../../model");
const login = async ({ id, password }) => {
  const user = await userService.findUserById(id);
  if (!user) {
    throw badRequest("Invalid Credentials");
  }
  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw badRequest("Invalid Credentials");
  }

  const payload = {
    id: user.id,
    name: user[user.role].name,
    role: user.role,
  };

  return generateToken({ payload });
};

const checkOwnership = async ({ resourceId, userId }) => {
  const user = await User.findById(resourceId);
  if (!user) throw notFound();

  if (user.id === userId) {
    return true;
  }
  return false;
};

module.exports = {
  login,
  checkOwnership,
};
