const express = require("express");
const {
  register,
  signin,
  logout,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const router = express.Router();

router.post("/signup", register);
router.post("/login", signin);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json({ success: true, message: "Authenticated User !", user });
});

module.exports = router;
