const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const auth = require("../middleware/authentication");
const authorizeRoles = require("../middleware/authorizeRoles");

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard", auth, (req, res) => {
  res.status(200).json({
    msg: `Hello ${req.user.name}, your role is ${req.user.role}`,
    user: req.user,
  });
});

router.get("/admin-dashboard", auth, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    msg: `Welcome Admin ${req.user.name}`,
    user: req.user,
  });
});

router.get("/user-dashboard", auth, authorizeRoles("user"), (req, res) => {
  res.status(200).json({
    msg: `Welcome User ${req.user.name}`,
    user: req.user,
  });
});

module.exports = router;
