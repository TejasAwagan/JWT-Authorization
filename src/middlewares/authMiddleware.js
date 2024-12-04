const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token, Authorization Denied !",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = decode;

    console.log("The Decoded User is", req.user);

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token is Invalid",
    });
  }
};

module.exports = verifyToken;
