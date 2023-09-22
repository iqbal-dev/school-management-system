const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const { controllers: studentController } = require("../api/v1/student");
const { controllers: teacherController } = require("../api/v1/teacher");
const { controllers: adminController } = require("../api/v1/admin");
const { controllers: subjectController } = require("../api/v1/subject");
const { controllers: classController } = require("../api/v1/class");
const { controllers: sectionController } = require("../api/v1/section");
const { controllers: routineController } = require("../api/v1/routine");
router.route("/api/v1/students").post(studentController.create);
router.route("/api/v1/students/:id").put(studentController.updateItem);
router.route("/api/v1/teachers").post(teacherController.create);
router.route("/api/v1/teachers/:id").put(teacherController.updateItem);
router.route("/api/v1/admins").post(adminController.create);
router.route("/api/v1/admins/:id").put(adminController.updateItem);
router.route("/api/v1/subjects").post(subjectController.create);
router.route("/api/v1/subjects/:id").put(subjectController.updateItem);
router.route("/api/v1/classes").post(classController.create);
router.route("/api/v1/classes/:id").put(classController.updateItem);
router.route("/api/v1/sections").post(sectionController.create);
router.route("/api/v1/sections/:id").put(sectionController.updateItem);
router.route("/api/v1/routines").post(routineController.create);
router.route("/api/v1/routines/:id").put(routineController.updateItem);

module.exports = router;
