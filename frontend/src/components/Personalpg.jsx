const API_URL = import.meta.env.VITE_API_URL;

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  RefreshCw,
} from "lucide-react";

// Reusable InputField
const InputField = React.memo(
  ({
    icon: Icon,
    label,
    type,
    value,
    onChange,
    required = false,
    placeholder,
  }) => (
    <div className="group relative">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        <Icon className="w-4 h-4 text-purple-600" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 shadow-sm text-sm sm:text-base"
          autoComplete="off"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  )
);

const Personalpg = () => {
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [resumeformemail, setResumeFormEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
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
        const u = res.data.user;
        setName(u?.name || "");
        setProfession(u?.profession || "");
        setCity(u?.city || "");
        setResumeFormEmail(u?.resumeformemail || "");
        setPhone(u?.phone || "");
        setLinkedin(u?.linkedin || "");
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user_id]);

  const personalpgformsubmithandler = async (e) => {
    e.preventDefault();
    const formdata1 = {
      name,
      profession,
      city,
      resumeformemail,
      phone,
      linkedin,
      email: data?.email,
      password: data?.password,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/users/personalpg-homepg`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" },
          body: JSON.stringify(formdata1),
        }
      );
      const result = await response.json();

      if (result.success) {
        navigate("/Educationpage");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetform = () => {
    setName("");
    setProfession("");
    setCity("");
    setResumeFormEmail("");
    setPhone("");
    setLinkedin("");
  };

  // Stable handlers with useCallback
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleProfessionChange = useCallback(
    (e) => setProfession(e.target.value),
    []
  );
  const handleCityChange = useCallback((e) => setCity(e.target.value), []);
  const handleEmailChange = useCallback(
    (e) => setResumeFormEmail(e.target.value),
    []
  );
  const handlePhoneChange = useCallback((e) => setPhone(e.target.value), []);
  const handleLinkedinChange = useCallback(
    (e) => setLinkedin(e.target.value),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen">
        {/* LEFT FORM */}
        <div className="bg-white shadow-xl border-r border-purple-100 overflow-y-auto no-scrollbar">
          <div className="h-full p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                Personal Details
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                Tell us about yourself to get started on your professional resume
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 sm:space-y-6">
              <InputField
                icon={User}
                label="Full Name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your full name"
                required
              />
              <InputField
                icon={Briefcase}
                label="Profession"
                type="text"
                value={profession}
                onChange={handleProfessionChange}
                placeholder="e.g., Software Engineer"
              />
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                value={resumeformemail}
                onChange={handleEmailChange}
                placeholder="your.email@example.com"
                required
              />
              <InputField
                icon={MapPin}
                label="City"
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Your current city"
              />
              <InputField
                icon={Phone}
                label="Phone Number"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+91 98765 43210"
              />
              <InputField
                icon={Linkedin}
                label="LinkedIn Profile"
                type="text"
                value={linkedin}
                onChange={handleLinkedinChange}
                placeholder="linkedin.com/in/yourprofile"
              />

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-purple-100">
                <button
                  onClick={personalpgformsubmithandler}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Next: Education Page
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
                <button
                  onClick={resetform}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 overflow-y-auto no-scrollbar">
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
              <div className="flex items-center">
                <div className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Resume Preview
                </h2>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Preview</span>
              </div>
            </div>

            {/* Resume Content */}
            <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-y-auto no-scrollbar">
              <div className="w-full h-full max-w-[1000px] p-4 sm:p-6 bg-white text-sm sm:text-base">
                <div className="p-2 sm:p-4">
                  {/* Header */}
                  <header className="text-center mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {name || "Mayank Jha"}
                    </h1>
                    <p className="text-gray-600">
                      {profession || "Software Engineer"}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {city || "Ranchi"} | {phone || "8817010881"} |{" "}
                      {resumeformemail || "mayankjha@gmail.com"}
                    </p>
                    {(data.linkedin || linkedin) && (
                      <a
                        href={linkedin || "linkedin.com/mayankjha"}
                        className="text-blue-600 text-xs sm:text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                  </header>

                  {/* Summary */}
                  {data.professionalSummary && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {data.professionalSummary}
                      </p>
                    </section>
                  )}

                  {/* Skills */}
                  {data.skills?.length > 0 && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Skills
                      </h2>
                      <ul className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                          <li
                            key={index}
                            className="bg-gray-200 px-2 py-1 rounded-full text-xs sm:text-sm"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Languages */}
                  {data.languagesSelected?.length > 0 && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Languages
                      </h2>
                      <ul className="flex flex-wrap gap-2">
                        {data.languagesSelected.map((lang, index) => (
                          <li
                            key={index}
                            className="bg-gray-200 px-2 py-1 rounded-full text-xs sm:text-sm"
                          >
                            {lang}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Projects */}
                  {data.project?.length > 0 && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Projects
                      </h2>
                      {data.project.map((proj, index) => (
                        <div key={index} className="mb-3 sm:mb-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
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
                          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800 space-y-1">
                            {proj.points?.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* Experience */}
                  {data.experience?.length > 0 && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Experience
                      </h2>
                      {data.experience.map((exp, index) => (
                        <div key={index} className="mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg font-semibold">
                            {exp.companyName}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {exp.experienceType} | {exp.companyLocation}
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            {exp.startYear} - {exp.endYear}
                          </p>
                          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-800 space-y-1">
                            {exp.points?.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </section>
                  )}

                  {/* Education */}
                  {data.education?.length > 0 && (
                    <section className="mb-4 sm:mb-6">
                      <h2 className="text-lg sm:text-xl font-semibold border-b pb-1 mb-2">
                        Education
                      </h2>
                      {data.education.map((edu, index) => (
                        <div key={index} className="mb-3 sm:mb-4">
                          <h3 className="text-base sm:text-lg font-semibold">
                            {edu.institution}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {edu.degree} in {edu.fieldofstudy}
                          </p>
                          <p className="text-xs text-gray-500">
                            {edu.startYear} - {edu.endYear}
                          </p>
                          {edu.overallCGPA && (
                            <p className="text-xs text-gray-500">
                              CGPA: {edu.overallCGPA}
                            </p>
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

      {/* Hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Personalpg;
