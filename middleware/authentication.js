const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.cookie?.split("authToken=")[1];
  const specialPath = [
    "createUser",
    "getAllUsers",
    "getUser",
    "updateUser",
    "deleteUser",
  ];

  if (!token) {
    return res.status(401).send({ error: "Please login first." });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).send({ error: "Authentication failed." });
      }

      const path = req.route.path.split("/")[1];

      if (decoded.role === "receptionist" && specialPath.includes(path)) {
        res.status(401).send({ error: "Authentication failed" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticateUser;
