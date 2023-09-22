const { User } = require("../../../model");

// Student ID
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

const generateStudentId = async () => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, "0"); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  //20 25
  incrementedId = `2320${incrementedId}`;

  return incrementedId;
};

// Faculty ID
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: "teacher" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0");
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

// Admin ID
const findLastAdminId = async () => {
  const lastFaculty = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

const generateAdminId = async () => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, "0");
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};

module.exports = {
  generateAdminId,
  findLastAdminId,
  findLastStudentId,
  generateStudentId,
  findLastFacultyId,
  generateFacultyId,
};
