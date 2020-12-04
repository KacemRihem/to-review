const express = require("express");
const router = express.Router();
const authMiddleware = require("../Helpers/authMiddelware");
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Load Connected User
router.get("/", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User Not Found!" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Login User
router.post(
  "/",
  [
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Minimum length allowed is 8 character").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Please Register Before" }] });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        } else if (!isMatch) {
          return res.json({ errors: [{ msg: "Wrong Password" }] });
        } else {
          let payload = {
            userId: user._id,
            userName: user.firstname,
            userEmail: user.email,
            userPassword: user.password,
            UserRole: user.role,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);

module.exports = router;
