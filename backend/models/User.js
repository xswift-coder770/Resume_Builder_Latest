const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: String,
  fieldofstudy: String,
  degree: String,
  overallCGPA: String,
  startYear: String,
  endYear: String,
});

// const projectSchema = new mongoose.Schema({
//   title: String,
//   link: String,
//   description: String,
// });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  techstack:{ type: String, required:true },
  points: { type: [String], default: [] } 
});

const experienceSchema = new mongoose.Schema({
  experienceType: String,
  companyName: String,
  companyLocation: String,
  startYear: String,
  endYear: String,
  points: [String],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  profession: String,
  resumeformemail: String,
  city: String,
  phone: { type: Number, max: 9999999999, min: 1000000000 },
  linkedin: String,
  education: { type: [educationSchema] },
  skills: [String],
  languagesSelected: [String],
  project: { type: [projectSchema] },
  experience: { type: [experienceSchema] },
  professionalSummary: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
