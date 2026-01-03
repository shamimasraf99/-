const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Expecting "Bearer [token]"
  const parts = token.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send({ message: "Token format is 'Bearer <token>'" });
  }
  
  const tokenValue = parts[1];

  jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === 'অ্যাডমিন') {
      return next();
    }
    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: "Unable to validate user role." });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
