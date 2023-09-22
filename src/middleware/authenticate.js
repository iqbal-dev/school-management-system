const tokenService = require("../lib/token");
const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = tokenService.verifyToken({ token });
    const user = await userService.findUserById(decoded.id);

    if (!user) {
      next(authenticationError());
    }

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
