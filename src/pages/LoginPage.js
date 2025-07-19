import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("Backend URL is", BACKEND_URL);


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });

      if (res.data.success) {
        // alert("Login successful!");
        localStorage.setItem('email', email);

        navigate("/chat"); // redirect to /chat on success
      } else {
        alert(res.data.message || "Login failed.");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Invalid credentials");
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
