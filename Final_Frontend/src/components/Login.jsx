import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './Home.css'; 
import hallLogo from "../assets/hall-logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", { email, password });
      login(res.data.token, res.data.isAdmin);
      localStorage.setItem("isAdmin", res.data.isAdmin);

      if (res.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setMessage("Login successful!");
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#3e2847] py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#d4d4ff]">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-[#d4d4ff] shadow-sm ring-1 ring-inset ring-gray-700 placeholder-[#b0b0e0] focus:ring-2 focus:ring-[#8e44ad] sm:text-sm sm:leading-6 bg-[#1a1a1a]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#d4d4ff]">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgot-password" className="font-semibold text-[#8a2be2] hover:text-[#d4d4ff]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-[#d4d4ff] shadow-sm ring-1 ring-inset ring-gray-700 placeholder-[#b0b0e0] focus:ring-2 focus:ring-[#8e44ad] sm:text-sm sm:leading-6 bg-[#1a1a1a]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-[#8e44ad] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6a0dad] focus:outline-none focus:ring-2 focus:ring-[#8e44ad] focus:ring-offset-2 ${loading && 'cursor-not-allowed opacity-50'}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-center">
              <p className={`text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-[#b0b0e0]">
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold text-[#8a2be2] hover:text-[#d4d4ff]">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
