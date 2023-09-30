const request = require("supertest");
const app = require("../../src/app");

describe("Class Controller", () => {
  let token;
  beforeAll(async () => {
    // Create an admin user before running the tests
    const adminResponse = await request(app)
      .post("/api/v1/admins")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer skjdfgsjd")
      .send({
        name: "fazlul haque",
        role: "Admin",
        profileImage: "https://s3.aws.example.com/23nds",
        password: "password123",
        email: "fazlul@gmail.com",
        phone: "4040149",
        emergencyContactNo: "341974",
        dob: "2023-09-30T06:11:33.849Z",
        gender: "Male",
        bloodGroup: "A+",
        presentAddress: "moheshpur, bitghar, brahmanbaria",
        permanentAddress: "moheshpur, bitghar, brahmanbaria",
        designation: "Head Teacher",
      });

    adminId = adminResponse.body.data.adminId;

    // Log in user and assign the token
    const response = await request(app)
      .post("/api/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({
        id: adminId,
        password: "password123",
      });

    token = response.body.data.access_token;
  });
  it("should create a class and return 201 status", async () => {
    const classesResponse = await request(app)
      .post("/api/v1/classes")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        className: "ten",
      });

    expect(classesResponse.status).toBe(201);
  });

  it("Without token should  return 401 status", async () => {
    const classesResponse = await request(app)
      .post("/api/v1/classes")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer `)
      .send({
        className: "ten",
      });

    expect(classesResponse.status).toBe(401);
  });
  it("without class name should  return 401 status", async () => {
    const classesResponse = await request(app)
      .post("/api/v1/classes")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        className: "",
      });

    expect(classesResponse.status).toBe(400);
  });
  it("should return all classes", async () => {
    const classesResponse = await request(app)
      .get("/api/v1/classes?page=1&limit=10&sort_type=dsc&sort_by=updatedAt")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);
    expect(classesResponse.status).toBe(200);
  });
});
