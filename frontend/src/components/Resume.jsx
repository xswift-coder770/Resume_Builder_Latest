const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Resume = () => {
  const [data, setData] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const user_id = JSON.parse(localStorage.getItem("user_id"));
   const token = localStorage.getItem("token");

  // Color themes
  const themes = {
    classic: {
      name: "Classic",
      primary: "#000000",
      secondary: "#374151",
      accent: "#2563eb",
      border: "#d1d5db",
      background: "#f3f4f6",
    },
    modern: {
      name: "Modern Blue",
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#2563eb",
      border: "#3b82f6",
      background: "#dbeafe",
    },
    professional: {
      name: "Professional Green",
      primary: "#047857",
      secondary: "#059669",
      accent: "#10b981",
      border: "#059669",
      background: "#d1fae5",
    },
    creative: {
      name: "Creative Purple",
      primary: "#7c3aed",
      secondary: "#8b5cf6",
      accent: "#a855f7",
      border: "#8b5cf6",
      background: "#e9d5ff",
    },
    elegant: {
      name: "Elegant Gray",
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#4b5563",
      border: "#6b7280",
      background: "#f9fafb",
    },
    warm: {
      name: "Warm Orange",
      primary: "#c2410c",
      secondary: "#ea580c",
      accent: "#f97316",
      border: "#ea580c",
      background: "#fed7aa",
    },
  };

  const currentTheme = themes[selectedTheme];

  // Fetch user data & saved theme
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
        const userData = res.data.user || {};
        setData(userData);

        // Load saved theme if available
        if (userData.selectedTheme) {
          setSelectedTheme(userData.selectedTheme);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setData({
          name: "Gaurav Kumar Baraik",
          profession: "Software Engineer",
          city: "Ranchi",
          phone: "8817010881",
          email: "GauravBaraik@gmail.com",
        });
      }
    };

    if (user_id) {
      fetchUserData();
    } else {
      console.error("No user_id found in localStorage");
    }
  }, [user_id]);


   const handleThemeChange = (themeKey) => {
    setSelectedTheme(themeKey);
  };

const handleDownloadPDF = async () => {
  if (user_id && user_id !== "demo-user") {
    try {
      const token = localStorage.getItem("token"); // or sessionStorage, depending on your auth setup

      const res = await axios.post(
        `${API_URL}/api/resume/download/${user_id}`,
        { colorScheme: selectedTheme }, // body
        {
          responseType: "blob", // PDF as binary
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach JWT
          },
        }
      );

      // Create a blob download link
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  } else {
    window.print(); // fallback for demo
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-white">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Theme Selector */}
        <div className="w-full md:w-80 bg-white shadow-lg p-6">
          <div className="sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Choose Resume Theme
            </h3>
            <div className="space-y-3">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedTheme === key
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                  </div>
                  <p className="font-medium text-gray-700">{theme.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {key === "classic"
                      ? "Traditional and professional"
                      : key === "modern"
                      ? "Clean and contemporary"
                      : key === "professional"
                      ? "Corporate and trustworthy"
                      : key === "creative"
                      ? "Bold and artistic"
                      : key === "elegant"
                      ? "Sophisticated and minimal"
                      : "Friendly and approachable"}
                  </p>
                </button>
              ))}
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="w-full mt-6 px-6 py-3 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium transform hover:scale-105"
              style={{
                backgroundColor: currentTheme.primary,
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = currentTheme.secondary)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = currentTheme.primary)
              }
            >
              Download as PDF
            </button>
          </div>
        </div>

        {/* Right Side - Resume Preview */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Resume Preview
            </h2>

            {/* Resume Card */}
            <div
              id="resume-card"
              className="bg-white shadow-xl rounded-xl p-8"
              style={{
                backgroundColor: "#ffffff",
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              {/* Header */}
              <header
                className="text-center pb-4 mb-6"
                style={{ borderBottom: `2px solid ${currentTheme.border}` }}
              >
                <h1
                  className="text-4xl font-bold"
                  style={{ color: currentTheme.primary }}
                >
                  {data.name || "Gaurav Kumar Baraik"}
                </h1>
                <p
                  className="text-lg font-medium mt-2"
                  style={{ color: currentTheme.secondary }}
                >
                  {data.profession || "Software Engineer"}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {data.city || "Ranchi"} | {data.phone || "8817010881"} |{" "}
                  {data.email || "GauravBaraik@gmail.com"}
                </p>
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    className="text-sm hover:underline mt-1 inline-block"
                    style={{ color: currentTheme.accent }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
              </header>

              {/* Professional Summary */}
              {data.professionalSummary && (
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {data.professionalSummary}
                  </p>
                </section>
              )}

              {/* Skills */}
              {data.skills?.length > 0 && (
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: currentTheme.background,
                          color: currentTheme.primary,
                          border: `1px solid ${currentTheme.border}`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {data.languagesSelected?.length > 0 && (
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {data.languagesSelected.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: currentTheme.background,
                          color: currentTheme.primary,
                          border: `1px solid ${currentTheme.border}`,
                        }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {data.project?.length > 0 && (
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Projects
                  </h2>
                  {data.project.map((proj, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: currentTheme.secondary }}
                        >
                          {proj.title}
                        </h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                            style={{ color: currentTheme.accent }}
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 italic mb-2">
                        <strong>Tech Stack:</strong> {proj.techstack}
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
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
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Experience
                  </h2>
                  {data.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: currentTheme.secondary }}
                      >
                        {exp.companyName}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium">
                        {exp.experienceType} | {exp.companyLocation}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        {exp.startYear} - {exp.endYear}
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
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
                <section className="mb-6">
                  <h2
                    className="text-xl font-semibold mb-3 pb-1"
                    style={{
                      color: currentTheme.primary,
                      borderBottom: `1px solid ${currentTheme.border}`,
                    }}
                  >
                    Education
                  </h2>
                  {data.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: currentTheme.secondary }}
                      >
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {edu.degree} in {edu.fieldofstudy}
                      </p>
                      <p className="text-xs text-gray-600">
                        {edu.startYear} - {edu.endYear}
                      </p>
                      {edu.overallCGPA && (
                        <p className="text-xs text-gray-600">
                          <strong>CGPA:</strong> {edu.overallCGPA}
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
  );
};

export default Resume;
