const bcrypt = require("bcryptjs");
const { generateHash, hashMatched } = require("../../src/utils/hashing");

describe("bcrypt functions", () => {
  it("should generate and verify a hash", async () => {
    const payload = "password123";
    const hash = await generateHash(payload);
    expect(hash).toBeDefined();
    expect(hash.length).toBeGreaterThan(0);

    const isMatch = await hashMatched(payload, hash);
    expect(isMatch).toBe(true);
  });

  it("should return false for incorrect password", async () => {
    const correctPassword = "password123";
    const incorrectPassword = "wrongPassword";
    const hash = await generateHash(correctPassword);

    const isMatch = await hashMatched(incorrectPassword, hash);
    expect(isMatch).toBe(false);
  });
});
