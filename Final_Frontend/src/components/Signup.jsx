import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Home.css'; 
import hallLogo from "../assets/hall-logo.svg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (/^\d{2}ucs\d{3}$/gmi.test(name)) {
      setEmail(`${name.toLowerCase()}@lnmiit.ac.in`);
    } else {
      setEmail("");
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/signup", {
        name,
        email,
        password,
      });
      login(res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin);

      if (res.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setMessage("Signup successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  const isFormValid = () => {
    return (
      name && /^\d{2}ucs\d{3}$/gmi.test(name) && email && password.length >= 6
    );
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="LNMIIT"
          src={hallLogo}
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#3e2847] py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#d4d4ff]"
              >
                Username/Enrollment Number
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={name}
                  type="text"
                  required
                  placeholder="ex. 12ucs123"
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-[#d4d4ff] shadow-sm ring-1 ring-inset ring-gray-700 placeholder-[#b0b0e0] focus:ring-2 focus:ring-[#8e44ad] sm:text-sm sm:leading-6 bg-[#1a1a1a]"
                />
                {!/^\d{2}ucs\d{3}$/gmi.test(name) && name.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    Invalid format. Expected format is 12ucs123.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#d4d4ff]"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  readOnly
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2 px-3 text-[#d4d4ff] shadow-sm ring-1 ring-inset ring-gray-700 placeholder-[#b0b0e0] focus:ring-2 focus:ring-[#8e44ad] sm:text-sm sm:leading-6 bg-[#1a1a1a]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#d4d4ff]"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-[#d4d4ff] shadow-sm ring-1 ring-inset ring-gray-700 placeholder-[#b0b0e0] focus:ring-2 focus:ring-[#8e44ad] sm:text-sm sm:leading-6 bg-[#1a1a1a]"
                />
              </div>
              {password.length < 6 && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be of at least 6 characters.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e44ad] focus:ring-offset-2 ${isFormValid() ? "bg-[#8e44ad] hover:bg-[#6a0dad]" : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Sign Up
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-center">
              <p
                className={`text-sm ${message.includes("successful") ? "text-green-500" : "text-red-500"
                  }`}
              >
                {message}
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-[#b0b0e0]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#8a2be2] hover:text-[#d4d4ff]"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
