const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_KEY } = require("../config/keys");

module.exports.signin = async (req, res) => {
  const candidate = await User.findOne({
    $or: [{ email: req.body.email }, { name: req.body.name }],
  });

  if (candidate) {
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    console.log(JWT_KEY);
    if (isValidPassword) {
      const token = jwt.sign(
        {
          name: candidate.name,
          userId: candidate._id,
        },
        JWT_KEY,
        { expiresIn: 3600 }
      );

      return res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      return res.status(404).json({
        message: "Password is incorrect, try again",
      });
    }
  } else {
    return res.status(404).json({
      message: "User was not found, please sign up first",
    });
  }
};

module.exports.signup = async (req, res) => {
  const candidate = await User.findOne({
    $or: [{ email: req.body.email }, { name: req.body.name }],
  });
  //In this example, we are using the $or operator to search for users with either the specified email or name.
  // The candidate variable will contain the user object if a user with the specified email or name is found in the database, or null if no user is found.

  if (candidate) {
    if (candidate.email === req.body.email) {
      return res.status(409).json({
        message: "Email already exist, please signIn",
      });
      //If you don't use return statements in these blocks, the function will continue executing and may send multiple responses back to the client, which can result in unexpected behavior or errors. Using return statements ensures that the function exits immediately after sending a response to the client, which is the expected behavior in this case.
    } else {
      return res.status(409).json({
        message: "This name already exist, please choose another one.",
      });
    }
  } else {
    const salt = bcrypt.genSaltSync(10);

    const password = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
    });

    try {
      await user.save();
      res.status(201).json({
        user,
        message: "User was created",
      });
    } catch (e) {
      //handle this errer
    }
  }
};
