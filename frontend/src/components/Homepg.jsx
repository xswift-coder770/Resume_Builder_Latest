


const API_URL = import.meta.env.VITE_API_URL;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BoyImage from '../../public/Resume.jpeg';
import { Link } from "react-router-dom"; 

const Homepg = () => {
  const [user, setUser] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([
    { rating: 5, text: 'This resume builder is the best! It helped me create a professional resume easily.' },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  localStorage.setItem('user_id', JSON.stringify(data.user._id));
  const token=localStorage.getItem("token");

  useEffect(() => setIsVisible(true), []);

  const createresume = () => navigate('/Personalpg');
  const handleLogout = () => {
    localStorage.removeItem("user_id"); // ✅ clear stored user_id
    localStorage.removeItem("token"); // ✅ clear stored token
    navigate("/"); // redirect to homepage/login
  };

  // Review submit
  const submitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === '') {
      alert('Please provide a rating and review text.');
      return;
    }
    const formdata = { reviewText, rating };
    try {
      const response = await fetch(`${API_URL}/api/reviews/reviewpg-homepg`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setReviewText('');
        setRating(0);
        window.location.reload();
      } else alert(responseData.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Fetch reviews
  useEffect(() => {
  const fetchReviews = async () => {
    try {
       // ✅ Get token from localStorage

      const response = await fetch(`${API_URL}/api/reviews/reviews`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,// ✅ Send token with request
          "Content-Type": "application/json",
          
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchReviews();
}, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Navbar */}
      <nav
        className={`backdrop-blur-md bg-white/30 border-b border-white/20 p-4 shadow-lg sticky top-0 z-50 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-800 to-blue-600 bg-clip-text text-transparent">
            Resume <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Builder</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
             <Link to="/ContactUs" className="hover:text-purple-600 font-medium">Contact</Link>
             <Link to="/ContactUs" className="hover:text-purple-600 font-medium">About</Link>
            <a href="/Resume.jpeg" className="hover:text-purple-600 font-medium">Template</a>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-6 rounded-full hover:from-red-600 hover:to-red-700 transition-all"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-3 bg-white/50 p-4 rounded-xl shadow-md">
            <a href="/ContactUs" className="hover:text-purple-600 font-medium">Contact</a>
            <a href="/ContactUs" className="hover:text-purple-600 font-medium">About</a>
            <a href="/Resume.jpeg" className="hover:text-purple-600 font-medium">Template</a>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-full hover:from-red-600 hover:to-red-700 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div
        className={`flex flex-col md:flex-row gap-10 w-full justify-center items-center p-6 sm:p-12 text-center md:text-left transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Left */}
        <div className="flex flex-col justify-center items-center md:items-start space-y-6 max-w-xl">
          <h1 className="text-4xl sm:text-6xl font-bold">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Resume </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Builder</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-purple-700">Build your Dreams</p>
          <p className="italic text-gray-700">"Your resume is your first impression - make it count."</p>
          <p className="text-gray-600">Start building your perfect resume with ease using our resume builder. A well-crafted resume opens doors to better opportunities.</p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <button
              onClick={createresume}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 rounded-full hover:scale-110 transition-all"
            >
              Create Resume
            </button>
            <button
              onClick={createresume}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full hover:scale-110 transition-all"
            >
              Update Resume
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={BoyImage}
            alt="Resume Illustration"
            className="w-56 sm:w-72 md:w-80 lg:w-96 rounded-2xl shadow-xl hover:scale-105 transition-all"
          />
        </div>
      </div>

      {/* Reviews */}
      <section className="backdrop-blur-lg bg-white/40 border border-white/20 p-8 mt-10 rounded-3xl shadow-2xl mx-4 sm:mx-10 lg:mx-32">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        {/* Grid for reviews */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white/60 p-6 rounded-2xl shadow hover:scale-105 transition-all">
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-5 h-5 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27l4.18 2.73-1.64-5.45L18 7.45l-5.46-.47L10 2 7.46 6.98 2 7.45l4.46 5.1L5.82 18z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{review.reviewtext || review.text}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <form className="mt-8 bg-white/30 p-6 rounded-2xl border border-white/20" onSubmit={submitReview}>
          <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
          <div className="flex space-x-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-7 h-7 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={() => setRating(index + 1)}
              >
                <path d="M10 15.27l4.18 2.73-1.64-5.45L18 7.45l-5.46-.47L10 2 7.46 6.98 2 7.45l4.46 5.1L5.82 18z" />
              </svg>
            ))}
          </div>
          <textarea
            rows="4"
            className="w-full p-3 rounded-xl border border-purple-400 focus:outline-none focus:border-purple-600"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:scale-105 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white/30 border-t border-white/20 text-gray-700 p-6 mt-auto">
        <div className="text-center">
          <p>&copy; 2025 Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepg;

