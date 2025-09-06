const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Educationpg = () => {
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [data, setData] = useState({});
  const [educationEntries, setEducationEntries] = useState([
    { institution: "", fieldofstudy: "", degree: "", overallCGPA: "", startYear: "", endYear: "" },
  ]);
   const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/user/${user_id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
        setData(res.data.user || {});
        setEducationEntries(
          res.data.user.education?.length > 0
            ? res.data.user.education
            : [{ institution: "", fieldofstudy: "", degree: "", overallCGPA: "", startYear: "", endYear: "" }]
        );
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user_id]);

  const handleChange = (index, event) => {
    const newEntries = [...educationEntries];
    newEntries[index][event.target.name] = event.target.value;
    setEducationEntries(newEntries);
  };

  const handleDeleteEntry = (index) => {
    setEducationEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  const handleAddEntry = () => {
    setEducationEntries([
      ...educationEntries,
      { institution: "", fieldofstudy: "", degree: "", overallCGPA: "", startYear: "", endYear: "" },
    ]);
  };

  const handleSubmit = async () => {
    const formdata = { email: data.email, password: data.password, educationEntries };
    try {
      const response = await fetch(`${API_URL}/api/users/education`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const result = await response.json();
      if (result.success) {
        navigate("/Skillpg");
      } else {
        alert("Failed to save education details.");
      }
    } catch (error) {
      console.error("Error submitting education details:", error);
      alert("Error submitting education details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen">
        
        {/* LEFT: FORM SECTION */}
        <div className="bg-white shadow-xl border-r border-purple-100">
          <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
                Tell us about your education
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-md mx-auto">
                Enter your education details, even if you are currently studying or did not graduate.
              </p>
            </div>

            {/* Education Entries */}
            <div className="space-y-6">
              {educationEntries.map((entry, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                >
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(index)}
                    className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Institution</label>
                        <input
                          type="text"
                          name="institution"
                          value={entry.institution}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="e.g. BIT Mesra/D.A.V"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Degree</label>
                        <input
                          type="text"
                          name="degree"
                          value={entry.degree}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="e.g. B.Tech"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Field of Study</label>
                        <input
                          type="text"
                          name="fieldofstudy"
                          value={entry.fieldofstudy}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="e.g. CSE"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Overall Grade</label>
                        <input
                          type="text"
                          name="overallCGPA"
                          value={entry.overallCGPA}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="Enter your CGPA/Grade"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Start Year</label>
                        <input
                          type="text"
                          name="startYear"
                          value={entry.startYear}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="e.g. 2020"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">End Year</label>
                        <input
                          type="text"
                          name="endYear"
                          value={entry.endYear}
                          onChange={(e) => handleChange(index, e)}
                          placeholder="e.g. 2024"
                          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              ))}

              {/* Add More Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddEntry}
                  className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add More Education
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-purple-100">
              <button
                onClick={() => navigate("/Personalpg")}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back: Personal Details
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Next: Skills
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: RESUME PREVIEW */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center">
                <div className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Resume Preview</h2>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Preview</span>
              </div>
            </div>

            {/* Resume Container */}
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="h-full overflow-y-auto p-3 sm:p-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="w-full h-full max-w-[1000px] overflow-auto p-3 sm:p-6 bg-white">
                  <div className="p-2 sm:p-4">
                    {/* Resume Header */}
                    <header className="text-center mb-4 sm:mb-6">
                      <h1 className="text-xl sm:text-3xl font-bold">{data.name || "Mayank Jha"}</h1>
                      <p className="text-gray-600 text-sm sm:text-base">{data.profession || "Software Engineer"}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {data.city || "Ranchi"} | {data.phone || "8817010881"} | {data.email || "mayankjha@gmail.com"}
                      </p>
                      {data.linkedin && (
                        <a
                          href={data.linkedin || "linkedin.com/mayankjha"}
                          className="text-blue-600 text-xs sm:text-sm hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      )}
                    </header>

                    {/* Professional Summary */}
                    {data.professionalSummary && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">
                          Professional Summary
                        </h2>
                        <p className="text-gray-700 text-xs sm:text-sm">
                          {data.professionalSummary ||
                            "Experienced Software Engineer with a passion for building innovative web applications and solving complex problems."}
                        </p>
                      </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">Skills</h2>
                        <ul className="flex flex-wrap gap-2">
                          {data.skills.map((skill, index) => (
                            <li key={index} className="bg-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                              {skill || "JavaScript"}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Languages */}
                    {data.languagesSelected?.length > 0 && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">Languages</h2>
                        <ul className="flex flex-wrap gap-2">
                          {data.languagesSelected.map((lang, index) => (
                            <li key={index} className="bg-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                              {lang || "English"}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Projects */}
                    {data.project?.length > 0 && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">Projects</h2>
                        {data.project.map((proj, index) => (
                          <div key={index} className="mb-3 sm:mb-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-base sm:text-lg font-semibold">{proj.title || "Resume-Builder"}</h3>
                              {proj.link && (
                                <a
                                  href={proj.link || "a.com"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 text-xs sm:text-sm hover:underline"
                                >
                                  View Project
                                </a>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 italic mb-1">
                              Tech Stack: {proj.techstack || "HTML,CSS,JavaScript,React"}
                            </p>
                            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800">
                              {proj.points?.map((point, i) => (
                                <li key={i}>{point || "Secure authentication using JWT and GoogleOAuth"}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </section>
                    )}

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">Experience</h2>
                        {data.experience.map((exp, index) => (
                          <div key={index} className="mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg font-semibold">{exp.companyName || "Kristal.AI"}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {exp.experienceType || "Software Engineering Intern"} | {exp.companyLocation || "Singapore"}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                              {exp.startYear || "2025"} - {exp.endYear || "2025"}
                            </p>
                            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800">
                              {exp.points?.map((point, i) => (
                                <li key={i}>{point || "Built a Dashboard using Next.js"}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </section>
                    )}

                    {/* Education */}
                    {educationEntries?.length > 0 && (
                      <section className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-1 sm:mb-2">Education</h2>
                        {educationEntries.map((edu, index) => (
                          <div key={index} className="mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg font-semibold">{edu.institution || "Birla Institute of Technology, Mesra"}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {edu.degree || "Bachelor of Technology"} in {edu.fieldofstudy || "Computer Science and Engineering"}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              {edu.startYear || "2023"} - {edu.endYear || "2027"}
                            </p>
                            {edu.overallCGPA && (
                              <p className="text-[10px] sm:text-xs text-gray-500">CGPA: {edu.overallCGPA || "8.97"}</p>
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
      </div> 
    </div>
  );
};

export default Educationpg;
