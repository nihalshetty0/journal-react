const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("joi");

const { registerValidate } = require("../validator");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post("/", async (req, res) => {
  const error = registerValidate.validate(req.body).error;

  if (error?.details[0].message) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    // res.json({ msg: "User created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
