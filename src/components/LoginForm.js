import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/chat");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-96 text-center animate-fade-in-down">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Welcome Back 👋</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-xl mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 border rounded-xl mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
