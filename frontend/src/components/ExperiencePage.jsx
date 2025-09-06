







const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExperiencePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [experiences, setExperiences] = useState([]);
  const [professionalSummary, setProfessionalSummary] = useState("");
  const [formDataResponse, setFormDataResponse] = useState(null);
   const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/users/user/${user_id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
        );
        setData(res.data.user || {});
        setExperiences(
          res.data.user?.experience || [
            {
              experienceType: "",
              companyName: "",
              companyLocation: "",
              startYear: "",
              endYear: "",
              points: [""],
            },
          ]
        );
        setProfessionalSummary(res.data.user?.professionalSummary || "");
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user_id]);

  const handleChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handlePointChange = (expIndex, pointIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].points[pointIndex] = value;
    setExperiences(updatedExperiences);
  };

  const addPoint = (expIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].points.push("");
    setExperiences(updatedExperiences);
  };

  const removePoint = (expIndex, pointIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].points.splice(pointIndex, 1);
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        experienceType: "",
        companyName: "",
        companyLocation: "",
        startYear: "",
        endYear: "",
        points: [""],
      },
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const exp of experiences) {
      if (
        !exp.experienceType ||
        !exp.companyName ||
        !exp.companyLocation ||
        !exp.startYear ||
        !exp.endYear ||
        exp.points.some((pt) => !pt.trim())
      ) {
        alert("All fields and points are required for each experience!");
        return;
      }
    }

    const formdata = {
      experience: experiences,
      professionalSummary,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/users/experiencepg-homepg`,
        {
          method: "POST",
          headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(formdata),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setFormDataResponse(responseData);
        
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resumebtnhandler = () => {
    navigate("/Resume");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="grid grid-cols-1 xl:grid-cols-[42%_58%] min-h-screen">
        {/* LEFT SECTION - FORM */}
        <div className="relative bg-white/70 backdrop-blur-sm border-r border-gray-200/50 shadow-xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-32 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 -right-10 w-60 h-60 bg-indigo-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                Professional Experience
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg">
                Add your work experience and professional summary
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {experiences?.map((experience, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6"
                >
                  {/* Experience Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                      </div>
                      <h3 className="ml-2 sm:ml-3 text-sm sm:text-lg font-semibold text-gray-800">
                        Experience #{index + 1}
                      </h3>
                    </div>
                    {experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Role/Position */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Role/Position
                      </label>
                      <input
                        type="text"
                        value={experience.experienceType}
                        onChange={(e) => handleChange(index, "experienceType", e.target.value)}
                        placeholder="e.g., Software Engineer"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base"
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={experience.companyName}
                        onChange={(e) => handleChange(index, "companyName", e.target.value)}
                        placeholder="e.g., Google Inc."
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base"
                      />
                    </div>

                    {/* Company Location */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={experience.companyLocation}
                        onChange={(e) => handleChange(index, "companyLocation", e.target.value)}
                        placeholder="e.g., San Francisco, CA"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base"
                      />
                    </div>

                    {/* Years */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Start Year
                        </label>
                        <input
                          type="number"
                          value={experience.startYear}
                          onChange={(e) => handleChange(index, "startYear", e.target.value)}
                          min="1900"
                          placeholder="2020"
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          End Year
                        </label>
                        <input
                          type="number"
                          value={experience.endYear}
                          onChange={(e) => handleChange(index, "endYear", e.target.value)}
                          min="1900"
                          placeholder="2024"
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Key Achievements & Responsibilities
                      </label>
                      <div className="space-y-2 sm:space-y-3">
                        {experience.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-1 relative">
                              <div className="absolute left-2 sm:left-3 top-3 sm:top-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                              <input
                                type="text"
                                value={point}
                                onChange={(e) => handlePointChange(index, pIdx, e.target.value)}
                                placeholder={`Achievement or responsibility #${pIdx + 1}`}
                                className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-700 text-sm sm:text-base"
                              />
                            </div>
                            {experience.points.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePoint(index, pIdx)}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-lg flex items-center justify-center transition-all duration-200 mt-1"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => addPoint(index)}
                        className="mt-2 sm:mt-3 flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Achievement
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Experience Button */}
              <button
                type="button"
                onClick={addExperience}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-2xl font-semibold text-purple-600 hover:text-purple-700 transition-all duration-300 flex items-center justify-center group text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Experience
              </button>

              {/* Professional Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
                <div className="flex items-center mb-2 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="ml-2 sm:ml-3 text-sm sm:text-lg font-semibold text-gray-800">
                    Professional Summary
                  </h3>
                </div>
                <textarea
                  value={professionalSummary}
                  onChange={(e) => setProfessionalSummary(e.target.value)}
                  placeholder="Write a compelling professional summary..."
                  rows="4"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 text-gray-700 text-sm sm:text-base resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Experience
                </button>
                <button
                  type="button"
                  onClick={resumebtnhandler}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 sm:py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Finish Resume
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SECTION - RESUME PREVIEW */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-2 sm:mr-4"></div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Resume Preview</h2>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Preview</span>
              </div>
            </div>

            {/* Resume Container */}
           
 <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
  <div
    className="h-full overflow-y-auto p-4 sm:p-8"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <div className="p-2 sm:p-4">
      
      {/* Resume Header */}
      <header className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{data.name || 'Mayank Jha'}</h1>
        <p className="text-gray-600 text-sm sm:text-base">{data.profession || 'Software Engineer'}</p>
        <p className="text-gray-500 text-xs sm:text-sm">
          {data.city || 'Ranchi'} | {data.phone || '8817010881'} | {data.resumeformemail || 'mayankjha@gmail.com'}
        </p>
        {data.linkedin && (
          <a
            href={data.linkedin || 'linkedin.com/mayankjha'}
            className="text-blue-600 text-xs sm:text-sm hover:underline block sm:inline-block mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        )}
      </header>

      {/* Professional Summary */}
      {(data.professionalSummary || professionalSummary) && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            {professionalSummary || data.professionalSummary || 'Experienced Software Engineer with a passion for building innovative web applications and solving complex problems. Strong background in full-stack development and Agile methodologies.'}
          </p>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-1 sm:gap-2">
            {data.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {skill || 'JavaScript'}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {data.languagesSelected?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Languages</h2>
          <ul className="flex flex-wrap gap-1 sm:gap-2">
            {data.languagesSelected.map((lang, index) => (
              <li
                key={index}
                className="bg-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
              >
                {lang || 'English'}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Projects</h2>
          {data.project.map((proj, index) => (
            <div key={index} className="mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-lg font-semibold">{proj.title || 'Resume-Builder'}</h3>
                {proj.link && (
                  <a
                    href={proj.link || 'a.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs sm:text-sm hover:underline"
                  >
                    View Project
                  </a>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 italic mb-1">
                Tech Stack: {proj.techstack || 'HTML,CSS,JavaScript,React'}
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800">
                {proj.points?.map((point, i) => (
                  <li key={i}>{point || 'Secure authentication using JWT and GoogleOAuth'}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experiences?.length > 0 && experiences.some(exp => exp.experienceType || exp.companyName) && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-lg font-semibold">{exp.companyName || 'Kristal.AI'}</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {exp.experienceType || 'Software Engineering Intern'} | {exp.companyLocation || 'Singapore'}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                {exp.startYear || '2025'} - {exp.endYear || '2025'}
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800">
                {exp.points?.map((point, i) => (
                  <li key={i}>{point || 'Built a Dashboard using Next.js'}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-lg font-semibold">{edu.institution || 'Birla Institute of Technology,Mesra'}</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {edu.degree || 'Bachelor of Technology'} in {edu.fieldofstudy || 'Computer Science and Engineering'}
              </p>
              <p className="text-xs text-gray-500">{edu.startYear || '2023'} - {edu.endYear || '2027'}</p>
              {edu.overallCGPA && (
                <p className="text-xs text-gray-500">CGPA: {edu.overallCGPA || '8.97'}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          scrollbar-width: none;
        }
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ExperiencePage;