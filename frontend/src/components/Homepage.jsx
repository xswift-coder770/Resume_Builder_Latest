const API_URL = import.meta.env.VITE_API_URL;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [user, setUser] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    const formData = { email: loginEmail, password: loginPassword };

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage
      
     
      if (data.success) {
       
        navigate('/Homepg', {
          state: {user: data.user }, 
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      
    }
  };

  const registeruser = async (e) => {
    e.preventDefault();
    setUser('login');
    const formData = { email: registerEmail, password: registerPassword };

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("User created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  const registerbutton = () => {
    setUser('register');
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#f9f1fd] p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row w-full h-full">
        {/* Left Section */}
        <div className="sm:w-1/2 bg-[#f9f1fd] flex flex-col justify-center items-center p-8 h-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-black text-center">
            Resume <span className="text-red">Builder</span>
          </h1>
          <p className="text-2xl sm:text-3xl text-[#5e2a8c] mt-4 text-center">Build your Dreams</p>
          <p className="italic text-lg sm:text-xl text-black mt-6 text-center">"Your resume is your first impression - make it count."</p>
          <p className="text-lg sm:text-xl text-[#5e2a8c] mt-6 text-center leading-relaxed">
            Start building your perfect resume with ease using our resume builder. A well-crafted resume opens doors to better opportunities. Make your first impression count!
          </p>
        </div>

        {/* Right Section */}
        <div className="sm:w-1/2 bg-[#f9f1fd] flex justify-center items-center p-5 h-full">
          <div className="bg-[#f3e6fa] p-8 rounded-lg shadow-lg w-full max-w-md text-center relative shadow-[rgba(94,42,140,0.4)_0_0_20px]">
            {user === 'login' ? (
              <>
                <h2 className="text-3xl sm:text-4xl text-[#5e2a8c] mb-5">Login</h2>
                <form onSubmit={loginuser}>
                  <div className="mb-5 text-left">
                    <label htmlFor="email" className="text-lg sm:text-xl text-[#333] mb-2 block">Email:</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full p-3 text-lg sm:text-xl border border-[#ccc] rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-5 text-left">
                    <label htmlFor="password" className="text-lg sm:text-xl text-[#333] mb-2 block">Password:</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full p-3 text-lg sm:text-xl border border-[#ccc] rounded-lg"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#5e2a8c] text-white rounded-lg text-lg sm:text-xl hover:bg-[#4a1e71] transition-colors duration-300">Login</button>
                </form>
                <p className="mt-4 text-lg sm:text-xl text-[#5e2a8c]">
                  New user? <button className="text-[#5e2a8c] font-bold hover:underline" onClick={registerbutton}>Register</button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl text-[#5e2a8c] mb-5">Register</h2>
                <form onSubmit={registeruser}>
                  <div className="mb-5 text-left">
                    <label htmlFor="email" className="text-lg sm:text-xl text-[#333] mb-2 block">Email:</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full p-3 text-lg sm:text-xl border border-[#ccc] rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-5 text-left">
                    <label htmlFor="password" className="text-lg sm:text-xl text-[#333] mb-2 block">Password:</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full p-3 text-lg sm:text-xl border border-[#ccc] rounded-lg"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#5e2a8c] text-white rounded-lg text-lg sm:text-xl hover:bg-[#4a1e71] transition-colors duration-300">Register</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
