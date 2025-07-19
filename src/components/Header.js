import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">AI Recipe Generator</h1>
    <nav className="space-x-4">
      <Link to="/" className="hover:underline">Login</Link>
      <Link to="/register" className="hover:underline">Register</Link>
    </nav>
  </header>
);

export default Header;
