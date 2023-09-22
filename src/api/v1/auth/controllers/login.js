const authService = require("../../../../lib/auth");

const login = async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const accessToken = await authService.login({ id, password });

    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = login;
