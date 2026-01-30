const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};

module.exports = passUserToView;

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