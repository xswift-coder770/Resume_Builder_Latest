









const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Projectpg = () => {
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [data, setData] = useState({});
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [pointInput, setPointInput] = useState("");
  const [points, setPoints] = useState([]);
  const [techstack, setTechstack] = useState("");
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
        setProjects(res.data.user?.project || []);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user_id]);

  const addPoint = (e) => {
    e.preventDefault();
    if (!pointInput.trim()) return;
    setPoints((prev) => [...prev, pointInput.trim()]);
    setPointInput("");
  };

  const removePoint = (index) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const addprojectsbtnhandler = (e) => {
    e.preventDefault();
    if (!title || !link || points.length === 0) return;
    setProjects((prev) => [...prev, { title, link, techstack, points }]);
    setTitle("");
    setLink("");
    setTechstack("");
    setPoints([]);
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const skillsbtnhandler = async () => {
    const formData = {
      email: data.email,
      password: data.password,
      project: projects,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/users/projectpg-homepg`,
        {
          method: "POST",
          headers: {Authorization: `Bearer ${token}`,
           "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        navigate("/experiencepg");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen">
        {/* LEFT PANEL */}
        <div className="bg-white shadow-xl border-r border-purple-100">
          <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
                Project Manager
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                Showcase your projects and technical achievements
              </p>
            </div>

            {/* Project Form */}
            <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
              <form onSubmit={addprojectsbtnhandler} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Link
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter project link"
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techstack}
                    onChange={(e) => setTechstack(e.target.value)}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 text-sm sm:text-base"
                  />
                </div>

                {/* Points Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Add Points
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={pointInput}
                      onChange={(e) => setPointInput(e.target.value)}
                      placeholder="Enter a point"
                      className="flex-1 p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 text-sm sm:text-base"
                    />
                    <button
                      onClick={addPoint}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      +
                    </button>
                  </div>

                  {/* Points List */}
                  {points.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {points.map((pt, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-100"
                        >
                          <span className="text-gray-700 text-sm flex-1">{pt}</span>
                          <button
                            onClick={() => removePoint(idx)}
                            className="ml-3 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-all duration-200"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Add Project
                </button>
              </form>
            </div>

            {/* Project List */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
                Your Projects ({projects.length})
              </h3>
              {projects.length === 0 ? (
                <div className="text-center py-6 sm:py-8 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm sm:text-base">
                    No projects added yet
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Add your first project above
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div
                      key={`${project.title}-${index}`}
                      className="relative p-4 bg-gradient-to-r from-white to-purple-50 border border-purple-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <button
                        onClick={() => removeProject(index)}
                        className="absolute top-3 right-3 w-6 h-6 bg-red-50 hover:bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                      <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-1 pr-8">
                        {project.title}
                      </h4>
                      {project.techstack && (
                        <p className="text-xs sm:text-sm text-purple-700 font-medium mb-2">
                          Tech: {project.techstack}
                        </p>
                      )}
                      <ul className="list-disc pl-4 space-y-1 mb-3 text-xs sm:text-sm text-gray-700">
                        {project.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-700 text-xs sm:text-sm hover:text-purple-800 font-medium transition-colors duration-200"
                      >
                        Visit Project →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Button */}
            <div className="pt-4 sm:pt-6 border-t border-purple-100">
              <button
                onClick={skillsbtnhandler}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Go to Experience Page →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="h-full flex flex-col">
            {/* Resume Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Resume Preview
              </h2>
              <span className="text-xs sm:text-sm text-gray-500">Live Preview</span>
            </div>

            {/* Resume Container */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 sm:p-6">
                {/* Resume Content */}
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
      {(data.professionalSummary ) && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            { data.professionalSummary || 'Experienced Software Engineer with a passion for building innovative web applications and solving complex problems. Strong background in full-stack development and Agile methodologies.'}
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
 {projects?.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                      Projects
                    </h2>
                    {projects.map((proj, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-base sm:text-lg font-semibold">
                            {proj.title}
                          </h3>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs sm:text-sm hover:underline"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 italic mb-1">
                          Tech Stack: {proj.techstack}
                        </p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800">
                          {proj.points?.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}

      {/* Experience */}
      {data.experiences?.length > 0 && experiences.some(exp => exp.experienceType || exp.companyName) && (
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
  );
};

export default Projectpg;
