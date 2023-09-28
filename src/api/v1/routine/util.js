/**
 * Convert input data representing routines into a structured format grouped by days.
 *
 * @param {Array} input - The input data containing routines.
 * @returns {object} An object where routines are grouped by days.
 */
const convertRoutine = (input) => {
  const convertedData = {};

  // Iterate through the input data
  input.forEach((item) => {
    const day = item.day.toLowerCase(); // Convert the day to lowercase
    const time = `${item.startTime}-${item.endTime}`;
    const subject = item.subject.subjectName;
    const section = item.section.sectionName;
    const teacherId = item.teacher._id;
    const selfLink = `/routines/${item.id}`;
    const createdAt = item.createdAt;
    const updatedAt = item.updatedAt;

    // Create a teacher object with the required fields
    const teacher = {
      id: teacherId,
      name: item.teacher.name,
      // Add other teacher fields here
    };

    // Create the routine object
    const routine = {
      time,
      subject,
      section,
      teacherId,
      links: {
        self: selfLink,
        teacher: `/routines/${item.id}/teacher`,
        section: `/routines/sections/${item.section._id}`, // Assuming this is a constant value
      },
      createdAt,
      updatedAt,
      teacher,
    };

    // Check if the day exists in the convertedData object, if not, create it as an array
    if (!convertedData[day]) {
      convertedData[day] = [];
    }

    // Add the routine to the corresponding day
    convertedData[day].push(routine);
  });

  return convertedData;
};

module.exports = {
  convertRoutine,
};
