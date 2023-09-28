const { convertRoutine } = require("../../src/api/v1/routine/util"); // Replace with the actual path to your module

describe("convertRoutine", () => {
  it("should convert input data into the expected format", () => {
    // Sample input data
    const input = [
      {
        id: 1,
        day: "Monday",
        startTime: "09:00 AM",
        endTime: "10:30 AM",
        subject: {
          subjectName: "Math",
        },
        section: {
          sectionName: "A",
          _id: "section1",
        },
        teacher: {
          _id: "teacher1",
          name: "John Doe",
        },
        createdAt: "2023-09-28T10:00:00Z",
        updatedAt: "2023-09-28T11:30:00Z",
      },
    ];

    // Expected output
    const expectedOutput = {
      monday: [
        {
          time: "09:00 AM-10:30 AM",
          subject: "Math",
          section: "A",
          teacherId: "teacher1",
          links: {
            self: "/routines/1",
            teacher: "/routines/1/teacher",
            section: "/routines/sections/section1",
          },
          createdAt: "2023-09-28T10:00:00Z",
          updatedAt: "2023-09-28T11:30:00Z",
          teacher: {
            id: "teacher1",
            name: "John Doe",
          },
        },
      ],
    };

    const convertedData = convertRoutine(input);

    expect(convertedData).toEqual(expectedOutput);
  });
});
