const router = require("express").Router();
const { controllers: studentController } = require("../api/v1/student");
const { controllers: teacherController } = require("../api/v1/teacher");
const { controllers: adminController } = require("../api/v1/admin");
const { controllers: subjectController } = require("../api/v1/subject");
const { controllers: classController } = require("../api/v1/class");
const { controllers: sectionController } = require("../api/v1/section");
const { controllers: routineController } = require("../api/v1/routine");
const { controllers: authController } = require("../api/v1/auth");
const ownership = require("../middleware/ownership");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorization");
// Auth routes
router.post("/api/v1/auth/login", authController.login);

router
  .route("/api/v1/students")
  .post(authenticate, authorize(["admin"]), studentController.create)
  .get(authenticate, authorize(["admin"]), studentController.findAllItems);
router
  .route("/api/v1/students/:id")
  .put(authenticate, authorize(["admin"]), studentController.updateItem)
  .get(
    authenticate,
    authorize(["admin", "student"]),
    studentController.findSingleItem
  );
router
  .route("/api/v1/teachers")
  .post(authenticate, authorize(["admin"]), teacherController.create)
  .get(authenticate, authorize(["admin"]), teacherController.findAllItems);
router
  .route("/api/v1/teachers/:id")
  .put(
    authenticate,
    authorize(["admin", "teacher"]),
    teacherController.updateItem
  )
  .patch(
    authenticate,
    authorize(["admin", "teacher"]),
    teacherController.updateItemPatch
  )
  .get(
    authenticate,
    authorize(["admin", "teacher"]),
    teacherController.findSingleItem
  );
router
  .route("/api/v1/admins")
  .post(authenticate, authorize(["admin"]), adminController.create)
  .get(authenticate, authorize(["admin"]), adminController.findAllItems);
router
  .route("/api/v1/admins/:id")
  .put(authenticate, authorize(["admin"]), adminController.updateItem);
router
  .route("/api/v1/subjects")
  .post(authenticate, authorize(["admin"]), subjectController.create)
  .get(authenticate, authorize(["admin"]), subjectController.findAllItems);
router.route("/api/v1/subjects/:id").put(subjectController.updateItem);
router
  .route("/api/v1/classes")
  .post(authenticate, authorize(["admin"]), classController.create)
  .get(authenticate, authorize(["admin"]), classController.findAllItems);
router.route("/api/v1/classes/:id").put(classController.updateItem);
router
  .route("/api/v1/sections")
  .post(authenticate, authorize(["admin"]), sectionController.create)
  .get(authenticate, authorize(["admin"]), sectionController.findAllItems);
router
  .route("/api/v1/sections/:id")
  .put(authenticate, authorize(["admin"]), sectionController.updateItem);
router
  .route("/api/v1/routines")
  .post(authenticate, authorize(["admin"]), routineController.create)
  .get(authenticate, authorize(["admin"]), routineController.findAllItems);
router
  .route("/api/v1/routines/:id")
  .put(authenticate, authorize(["admin"]), routineController.updateItem);

module.exports = router;
