const request = require("supertest");
// const { response } = require("../../app");
const app = require("../../src/app");

describe("Class Controller", () => {
  describe("get all  class", () => {
    it("should return 200 and all the classes", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          id: "A-00007",
          password: "12345678",
        });

      expect(response.status).toBe(200);
    });
  });
});
