const express = require("express");
const router = express.Router();
const Part = require("../models/Part.js");

// GET /parts - Display all parts
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find().populate("owner");
    res.render("parts/index.ejs", { parts });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// GET /parts/new - Display form to create new part
router.get("/new", (req, res) => {
  // Block guest users from accessing the sell page
  if (req.session.user.isGuest) {
    return res.send("Guest users cannot sell parts. Please create an account to sell.");
  }
  res.render("parts/new.ejs");
});

// POST /parts - Create a new part listing
router.post("/", async (req, res) => {
  try {
    // Block guest users from creating parts
    if (req.session.user.isGuest) {
      return res.send("Guest users cannot sell parts. Please create an account to sell.");
    }
    req.body.owner = req.session.user._id;
    await Part.create(req.body);
    res.redirect("/parts");
  } catch (error) {
    console.error(error);
    res.redirect("/parts/new");
  }
});

// GET /parts/:partId - Display a single part
router.get("/:partId", async (req, res) => {
  try {
    const part = await Part.findById(req.params.partId).populate("owner");
    res.render("parts/show.ejs", { part });
  } catch (error) {
    console.error(error);
    res.redirect("/parts");
  }
});

// GET /parts/:partId/edit - Display edit form for a part
router.get("/:partId/edit", async (req, res) => {
  try {
    // Block guest users from editing parts
    if (req.session.user.isGuest) {
      return res.send("Guest users cannot edit parts. Please create an account.");
    }
    
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
    // Block guest users from updating parts
    if (req.session.user.isGuest) {
      return res.send("Guest users cannot update parts. Please create an account.");
    }
    
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
    // Block guest users from deleting parts
    if (req.session.user.isGuest) {
      return res.send("Guest users cannot delete parts. Please create an account.");
    }
    
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
