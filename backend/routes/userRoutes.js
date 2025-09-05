const express = require("express");
const {
  updatePersonalInfo,
  updateEducation,
  updateSkills,
  updateProjects,
  updateExperience,
  addEducationEntries,
  getUserInfo,
} = require("../controllers/userscontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

  
router.post("/personalpg-homepg", protect, updatePersonalInfo);
router.post("/educationpg-homepg", protect, updateEducation);
router.post("/skillpg-homepg", protect, updateSkills);
router.post("/projectpg-homepg", protect, updateProjects);
router.post("/experiencepg-homepg", protect, updateExperience);
router.post("/education", protect, addEducationEntries);

// Fetch logged-in user's info
router.get("/user/:id", protect, getUserInfo);

module.exports = router;