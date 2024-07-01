const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtScrete = "mynameisvarshaiamaprofressionalcoder";

router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPaasword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPaasword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct creditials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct creditials" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };
      const authToken = jwt.sign(data, jwtScrete);

      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
