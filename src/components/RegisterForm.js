import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirm) return alert("Passwords do not match");

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registered successfully. You can login now.");
      navigate("/");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-96 text-center animate-fade-in-down">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Create an Account 📝</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-3 border rounded-xl mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        className="w-full px-4 py-3 border rounded-xl mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-3 border rounded-xl mb-6"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-all"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
