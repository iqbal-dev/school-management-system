const request = require("supertest");
// const { response } = require("../../app");
const app = require("../../src/app");

describe("Class Controller", () => {
  describe("create class", () => {
    it("should return 201 and the class created", async () => {
      const response = await request(app)
        .post("/api/v1/subjects")
        .set("content-type", "application/json")
        .send({
          subjectName: "Bangla",
        });

      expect(response.status).toBe(201);
    });
  });
  describe("get all  class", () => {
    it("should return 200 and all the classes", async () => {
      const response = await request(app)
        .get("/api/v1/subjects?page=1&limit=10")
        .set("content-type", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
