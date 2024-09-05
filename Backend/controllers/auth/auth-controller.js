if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "User Already Exists !" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User Registered Succesfully !" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error occurs in register" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occurs in signin" });
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: false, message: "Logged out successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occurs in logout" });
  }
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User !" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized User!" });
  }
};

module.exports = { register, signin, logout, authMiddleware };
