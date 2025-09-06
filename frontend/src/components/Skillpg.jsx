

const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Skillpg = () => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [data, setData] = useState({});
  const [skills, setSkills] = useState(["Root-cause analysis", "Project management"]);
  const [languagesSelected, setLanguagesSelected] = useState(["English"]);
  const navigate = useNavigate();
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
        setSkills(res.data.user.skills || ["Root-cause analysis", "Project management"]);
        setLanguagesSelected(res.data.user.languagesSelected || ["English"]);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user_id]);

 

  const predefinedSkills = [
    "Communication Skills", "Teamwork", "Problem-solving", "Adaptability", "Critical Thinking",
    "Time Management", "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Go", "Swift",
    "Kotlin", "HTML", "CSS", "React.js", "Angular", "Vue.js", "Next.js", "Node.js",
    "Bootstrap", "Tailwind CSS",
  ];

  const predefinedLanguages = [
    "English", "Hindi", "Spanish", "French", "German",
    "Mandarin", "Japanese", "Russian", "Portuguese", "Arabic",
  ];

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) setSkills([...skills, skill]);
  };
  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const addLanguage = (language) => {
    if (language && !languagesSelected.includes(language))
      setLanguagesSelected([...languagesSelected, language]);
  };
  const removeLanguage = (language) =>
    setLanguagesSelected(languagesSelected.filter((l) => l !== language));

  const projectsbtnhandler = async () => {
    const formdata3 = { email: data.email, password: data.password, skills, languagesSelected };
    try {
      const response = await fetch(`${API_URL}/api/users/skillpg-homepg`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify(formdata3),
      });
      const data1 = await response.json();
      if (data1.success) navigate('/Projectpg');
      else alert(data1.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="grid grid-cols-1 xl:grid-cols-[40%_60%] min-h-screen">

        {/* LEFT SECTION */}
        <div className="relative bg-white/70 backdrop-blur-sm border-r border-gray-200/50 shadow-xl">
          <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                Skills & Languages
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Showcase your expertise and linguistic abilities
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6 sm:space-y-8">
              {/* Skills */}
              <div>
                <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Add Skills</h3>
                  <select
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/10 outline-none bg-white/80 text-gray-700 font-medium"
                    onChange={(e) => addSkill(e.target.value)}
                  >
                    <option value="">Select a skill to add</option>
                    {predefinedSkills.map((skill, index) => (
                      <option key={index} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Your Skills */}
              <div>
                <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Your Skills</h3>
                    <span className="ml-auto bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {skills.length}
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                    {skills.map((skill, index) => (
                      <div key={index} className="group flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 p-3 sm:p-4 rounded-xl border border-purple-200/50">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{skill}</span>
                        <button
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100"
                          onClick={() => removeSkill(skill)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Add Languages</h3>
                  <select
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/10 outline-none bg-white/80 text-gray-700 font-medium"
                    onChange={(e) => addLanguage(e.target.value)}
                  >
                    <option value="">Select a language to add</option>
                    {predefinedLanguages.map((language, index) => (
                      <option key={index} value={language}>{language}</option>
                    ))}
                  </select>
                </div>
              </div>


               <div>
                <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Your Languages</h3>
                    <span className="ml-auto bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {languagesSelected.length}
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                    {languagesSelected.map((language, index) => (
                      <div key={index} className="group flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 p-3 sm:p-4 rounded-xl border border-purple-200/50">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{language}</span>
                        <button
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100"
                          onClick={() => removeLanguage(language)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  className="w-full sm:flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg"
                  onClick={() => navigate("/Educationpage")}
                >
                  Back: Education
                </button>
                <button
                  className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg"
                  onClick={projectsbtnhandler}
                >
                  Next: Projects
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Resume Preview</h2>
              <span className="text-xs sm:text-sm text-gray-500">Live Preview</span>
            </div>
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-200 overflow-hidden">
              <div className="h-full overflow-y-auto p-3 sm:p-4">
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
     {skills?.length > 0 && (
                      <section className="mb-6">
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                          Skills
                        </h2>
                        <ul className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <li
                              key={index}
                              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                            >
                              {skill||'JavaScript'}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Languages */}
                    {languagesSelected?.length > 0 && (
                      <section className="mb-6">
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">
                          Languages
                        </h2>
                        <ul className="flex flex-wrap gap-2">
                          {languagesSelected.map((lang, index) => (
                            <li
                              key={index}
                              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                            >
                              {lang||'English'}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

      {/* Projects */}
 {data.project?.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                      Projects
                    </h2>
                    {data.project.map((proj, index) => (
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
      {data.experience?.length > 0 && data.experience.some(exp => exp.experienceType || exp.companyName) && (
        <section className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
          {data.experience.map((exp, index) => (
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

export default Skillpg;
