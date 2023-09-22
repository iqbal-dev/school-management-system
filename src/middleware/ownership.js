const { authorizationError } = require("../utils/error");
const { checkOwnership } = require("../lib/auth");

const ownership = () => async (req, _res, next) => {
  const isOwner = await checkOwnership({
    resourceId: req.params.id,
    userId: req.user.id,
  });

  if (isOwner) {
    return next();
  }
  return next(authorizationError());
};

module.exports = ownership;
