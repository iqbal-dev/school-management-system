const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const { controllers: studentController } = require("../api/v1/student");
const { controllers: teacherController } = require("../api/v1/teacher");
const { controllers: adminController } = require("../api/v1/admin");
router.route("/api/v1/students").post(studentController.create);
router.route("/api/v1/teachers").post(teacherController.create);
router.route("/api/v1/admins").post(adminController.create);

module.exports = router;
