const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");

//generate token
const { sign } = require("jsonwebtoken");
//User Table
const { User } = db.sequelize.models;

//bring the validation token
const { validateToken } = require("../middlewares/authMiddleware");

// Create user
router.post("/register", async (req, res) => {
  console.log("/api/register - post");
  //we are going to send those.
  const { name, email, password } = req.body;
  //salt 10 higer number is more complicated.
  bcrypt.hash(password, 10).then((hash) => {
    //create user. pass to the object
    User.create({
      name: name,
      email: email,
      password: hash,
    });
    res.json("Success");
  });
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //select * from Users where email = 'email'
  const user = await User.findOne({ where: { email: email } });

  // if no user, then error message.
  if (!user) res.json({ error: "User Doesn't Exist" });

  //compare if it matches, compare between user password and database passowrd.
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    //sign(data (we will want them to be token),
    const accessToken = sign(
      { email: user.email, isAdmin: user.isAdmin },
      "importantsecret"
    );
    //it can help to access to frontend.
    res.json({
      token: accessToken,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });
});

//auth
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
