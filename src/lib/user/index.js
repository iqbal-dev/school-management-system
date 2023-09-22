const User = require("../../model/User");
const defaults = require("../../config/defaults");
const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

const findUserById = async (id) => {
  const user = await User.findOne({ id })
    .populate({
      path: "student",
      select: "name",
    })
    .populate({
      path: "teacher",
      select: "name",
    })
    .populate({
      path: "admin",
      select: "name",
    });
  return user ? user : false;
};

const createUser = async ({ id, role, password, userId }) => {
  if (!id || !password || !role) throw badRequest("Invalid parameters");
  password = await generateHash(password);
  const user = await User.create({ id, password, role, [role]: userId });

  return { ...user._doc, id: user.id };
};

module.exports = {
  findUserById,
  createUser,
};
