const { serverError } = require("../../utils/error");
const jwt = require("jsonwebtoken");

/**
 * Generate a JSON Web Token (JWT) based on the provided payload.
 *
 * @param {object} params - Parameters for generating the JWT.
 * @param {object} params.payload - The payload to be included in the JWT.
 * @param {string} [params.algorithm="HS256"] - The signing algorithm to use.
 * @param {string} [params.secret] - The secret key for signing the JWT (default taken from environment variables).
 * @param {string} [params.expiresIn="1h"] - The expiration time for the JWT.
 * @returns {string} The generated JWT.
 * @throws {Error} If there is an issue generating the token.
 */

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET ?? "qwuierqwegrugqwehrjv",
  expiresIn = "1h",
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (e) {
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (e) {
    console.log("[JWT Decode]", e);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET || "qwuierqwegrugqwehrjv",
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    throw serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
