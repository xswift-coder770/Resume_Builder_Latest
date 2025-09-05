const User = require("../models/User");

// ✅ Update Personal Information
exports.updatePersonalInfo = async (req, res) => {
  const { name, profession, city, resumeformemail, phone, linkedin } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, profession, city, resumeformemail, phone, linkedin },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Personal info updated for:", req.user.email);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating personal info:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Education
exports.updateEducation = async (req, res) => {
  const { education } = req.body;

  if (!education) {
    return res
      .status(400)
      .json({ success: false, message: "Education data is required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { education: { $each: education } } },
      { new: true, upsert: true }
    ).select("-password");

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Skills & Languages
exports.updateSkills = async (req, res) => {
  const { skills, languagesSelected } = req.body;
  console.log("Skills to add:", skills);
  console.log("Languages to add:", languagesSelected);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          skills: skills || [],
          languagesSelected: languagesSelected || [],
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Projects
exports.updateProjects = async (req, res) => {
  const { project } = req.body;

  try {
    const sanitizedProjects = (project || []).map((p) => ({
      title: p.title || "",
      link: p.link || "",
      techstack: p.techstack || "",
      points: Array.isArray(p.points) ? p.points : [],
    }));

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { project: sanitizedProjects } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating projects:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Experience
exports.updateExperience = async (req, res) => {
  const { experience, professionalSummary } = req.body;

  try {
    const cleanedExperience = experience?.map((exp) => ({
      ...exp,
      points: Array.isArray(exp.points)
        ? exp.points.map((p) => String(p).trim())
        : [],
    }));

    const updatedFields = {
      ...(cleanedExperience && { experience: cleanedExperience }),
      ...(professionalSummary && { professionalSummary }),
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedFields },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Add Education Entries (overwrite)
exports.addEducationEntries = async (req, res) => {
  const { educationEntries } = req.body;

  if (!educationEntries) {
    return res.status(400).json({
      success: false,
      message: "Education entries are required",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { education: educationEntries } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating education entries:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get User Info (self)
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};