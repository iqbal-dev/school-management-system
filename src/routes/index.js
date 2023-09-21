const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const { controllers: studentController } = require("../api/v1/student");
router.route("/api/v1/students").post(studentController.create);

module.exports = router;
