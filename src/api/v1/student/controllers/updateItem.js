const studentService = require("../../../../lib/student");
const sectionService = require("../../../../lib/section");
const classService = require("../../../../lib/class");
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    gender,
    dob,
    email,
    contactNo,
    emergencyContactNo,
    bloodGroup,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    classId,
    sectionId,
  } = req.body;
  const {
    fatherName,
    fatherOccupation,
    fatherContactNo,
    motherName,
    motherOccupation,
    motherContactNo,
    address,
  } = guardian;
  const {
    name: localGuardianName,
    occupation,
    contactNo: localGuardianContact,
    address: localGuardianAddress,
  } = localGuardian;

  try {
    console.log("====================================");
    console.log({
      id,
      name,
      gender,
      dob,
      email,
      contactNo,
      emergencyContactNo,
      bloodGroup,
      presentAddress,
      permanentAddress,
      classId,
      sectionId,
      guardian: {
        fatherName,
        fatherOccupation,
        fatherContactNo,
        motherName,
        motherOccupation,
        motherContactNo,
        address,
      },
      localGuardian: {
        name: localGuardianName,
        occupation,
        contactNo: localGuardianContact,
        address: localGuardianAddress,
      },
    });
    console.log("====================================");
    const [classes, section] = await Promise.all([
      sectionService.findOneById(sectionId),
      classService.findOneById(classId),
    ]);
    if (!classes || !section) {
      throw badRequest("Invalid parameters");
    }
    const { data, code } = await studentService.updateOrCreate(id, {
      id,
      name,
      gender,
      dob,
      email,
      contactNo,
      emergencyContactNo,
      bloodGroup,
      presentAddress,
      permanentAddress,
      classId,
      sectionId,
      guardian: {
        fatherName,
        fatherOccupation,
        fatherContactNo,
        motherName,
        motherOccupation,
        motherContactNo,
        address,
      },
      localGuardian: {
        name: localGuardianName,
        occupation,
        contactNo: localGuardianContact,
        address: localGuardianAddress,
      },
    });

    const response = {
      code,
      message:
        code === 200
          ? "Student updated successfully"
          : "Student created successfully",
      data,
      links: {
        self: `/students/${data.id}`,
      },
    };
    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
