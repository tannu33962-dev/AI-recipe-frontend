import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("Backend URL is", BACKEND_URL);

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // NEW STATE

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-200">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mb-6 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded transition text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
