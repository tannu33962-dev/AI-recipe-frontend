import React from "react";
import { Link } from "react-router-dom";
import spicesImage from "../assets/spices.jpg";
import vegetableImage from "../assets/vegetable.jpg";
import dishImage from "../assets/dish.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-pink-200 px-6 py-10 text-center overflow-hidden">
      
      {/* Heading */}
      <h1 className="text-5xl font-bold text-purple-800 mb-4">Your AI Recipe Companion 🍲</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
        Discover tasty meals from your own kitchen! Just share what you have – and let AI cook up ideas.
      </p>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

        {/* Spices Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all">
          <img src={spicesImage} alt="Indian Spices" className="h-60 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-yellow-700">Start With Basics</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Salt, haldi, jeera – that's enough to begin! Our AI can craft something magical.
            </p>
          </div>
        </div>

        {/* Vegetables Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all">
          <img src={vegetableImage} alt="Fresh Vegetables" className="h-60 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-green-700">Got Some Veggies?</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Whether it's tomatoes, potatoes, or bhindi – we’ve got the perfect idea for you.
            </p>
          </div>
        </div>

        {/* Final Dish Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all">
          <img src={dishImage} alt="Delicious Dish" className="h-60 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-red-700">AI-Powered Recipe</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Get delicious step-by-step recipes straight to your inbox. Easy, quick & personalized!
            </p>
          </div>
        </div>

      </div>

      {/* Get Started Button */}
      <Link
        to="/login"
        className="inline-block px-8 py-4 bg-purple-700 text-white text-lg rounded-full font-semibold shadow-lg hover:bg-purple-800 transition-all"
      >
        Get Started →
      </Link>
    </div>
  );
};

export default HomePage;
