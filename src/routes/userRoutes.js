const express = require("express");
const { admin, manager, user } = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");
const AuthorizeRole = require("../middlewares/authorizeRoles");

const router = express.Router();

//Only admin can access this route
router.get("/admin", verifyToken, AuthorizeRole("admin"), admin);

//Both admin and manager can access this routes
router.get("/manager", verifyToken, AuthorizeRole("admin", "manager"), manager);

//All can access this routes
router.get(
  "/user",
  verifyToken,
  AuthorizeRole("admin", "manager", "user"),
  user
);

module.exports = router;
