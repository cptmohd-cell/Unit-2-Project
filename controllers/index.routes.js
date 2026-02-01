const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

module.exports = router;
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