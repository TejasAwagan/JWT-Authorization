const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashPassword, role });

    await newUser.save();

    res.status(200).json({
      message: `User Registered with Username ${username}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: `User with ${username} Not Found`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRETE,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went Wrong",
    });
  }
};

module.exports = {
  register,
  login,
};
