const express = require("express");
const router = express.Router();
const Part = require("../models/Part.js");


router.get("/", async (req, res) => {
  try {
    const parts = await Part.find().populate("owner");
    res.render("parts/index.ejs", { parts });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});


router.get("/new", (req, res) => {
  res.render("parts/new.ejs");
});


router.post("/", async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    await Part.create(req.body);
    res.redirect("/parts");
  } catch (error) {
    console.error(error);
    res.redirect("/parts/new");
  }
});


router.get("/:partId", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId).populate("owner");
    res.render("parts/show.ejs", { part });
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});


router.get("/:partId/edit", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId);
    
    if (!part.owner.equals(req.session.user._id)) {
      return res.send("You are not authorized to edit this part.");
    }
    
    res.render("parts/edit.ejs", { part });
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});


router.put("/:partId", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId);
    
    if (!part.owner.equals(req.session.user._id)) {
      return res.send("You are not authorized to update this part.");
    }
    
    await Part.findByIdAndUpdate(req.params.partId, req.body);
    res.redirect(`/parts/${req.params.partId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});


router.delete("/:partId", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId);
    
    if (!part.owner.equals(req.session.user._id)) {
      return res.send("You are not authorized to delete this part.");
    }
    
    await Part.findByIdAndDelete(req.params.partId);
    res.redirect("/parts");
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});

module.exports = router;
