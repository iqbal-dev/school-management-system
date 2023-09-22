const subjectService = require("../../../../lib/subject");
const create = async (req, res, next) => {
  const { subjectName } = req.body;
  try {
    const subject = await subjectService.create({ subjectName });
    res.status(201).json({
      code: 201,
      message: "Successfully subject created",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
