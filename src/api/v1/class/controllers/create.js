const classService = require("../../../../lib/class");
const create = async (req, res, next) => {
  const { className } = req.body;
  try {
    const classes = await classService.create({ className });
    res.status(201).json({
      code: 201,
      message: "Successfully class created",
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = create;
