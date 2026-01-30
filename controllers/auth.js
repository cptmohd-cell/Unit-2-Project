const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");



router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  //guest account log-in addition
  if (req.body.username === "guest") {
    req.body.password = bcrypt.hashSync("guestpassword", 10);
  }
  

  const user = await User.create(req.body);
  res.redirect("/auth/sign-in");
});

//guest account log-in route
router.get("/guest-login", async (req, res) => {
  const guestUser = await User.findOne({ username: "guest" });;
  if (!guestUser) {
    const hashedPassword = bcrypt.hashSync("guestpassword", 10);
    const guestUser = await User.create({
      username: "guest",
      password: hashedPassword,
    });
  }
  res.redirect("/auth/sign-in");
});



router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});



router.post("/sign-in", async (req, res) => {

  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }


  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

 
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  };

  res.redirect("/");
});


router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});





module.exports = router;
