const jwt = require("jsonwebtoken");
const { generateToken } = require("../../src/lib/token");

describe("generateToken Function", () => {
  it("should generate a token with default parameters", () => {
    const payload = { userId: 123 };

    const token = generateToken({ payload, secret: "qwuierqwegrugqwehrjv" });

    const decoded = jwt.decode(token);

    expect(decoded).toBeDefined();
    expect(decoded.userId).toBe(123);
  });

  it("should generate a token with custom algorithm and expiresIn", () => {
    const payload = { userId: 456 };
    const algorithm = "HS512";
    const expiresIn = "7d";
    const secret = "qwuierqwegrugqwehrjv";

    const token = generateToken({ payload, algorithm, expiresIn, secret });

    const decoded = jwt.decode(token);

    expect(decoded).toBeDefined();
    expect(decoded.userId).toBe(456);
  });

  // Add more test cases as needed
});
