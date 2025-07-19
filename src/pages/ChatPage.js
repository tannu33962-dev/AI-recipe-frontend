import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function RecipeGPTPage() {
  const [ingredients, setIngredients] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef(null);

  const email = localStorage.getItem('email');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGenerate = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/generate-recipe`, {
        ingredients
      });

      const prompt = ingredients;
      const response = res.data.recipe;

      const newMessages = [
        ...messages,
        { role: 'user', content: prompt },
        { role: 'assistant', content: response }
      ];
      setMessages(newMessages);
      setIngredients('');

      if (email) {
        await axios.post(`${BACKEND_URL}/api/save_history`, {
          email,
          prompt,
          response
        });
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: ingredients },
        { role: 'assistant', content: 'Error generating recipe.' }
      ]);
      console.error('Error:', err);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const handleToggleHistory = async () => {
    setShowHistory(prev => !prev);

    if (!showHistory && email) {
      // Switching to history mode, so fetch history
      try {
        const res = await axios.post(`${BACKEND_URL}/api/get_history`, {
          email
        });

        const historyData = res.data || [];
        const historyMessages = historyData.flatMap(item => [
          { role: 'user', content: item.prompt },
          { role: 'assistant', content: item.response }
        ]);
        setMessages(historyMessages);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setMessages([{ role: 'assistant', content: 'Failed to load history.' }]);
      }
    } else {
      // Switching back to chat mode, reset messages
      setMessages([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-orange-100 font-sans">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow z-20 p-4 flex justify-between items-center border-b border-orange-200">
        <h1 className="text-2xl font-bold text-orange-600 tracking-wide">🍲 AI Recipe Generator</h1>
        <div className="space-x-3">
          <button
            onClick={handleToggleHistory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showHistory ? 'Back to Chat' : 'View History'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat or History Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-3xl w-full mx-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg shadow-md transition-all ${
              msg.role === 'user'
                ? 'bg-orange-100 text-right'
                : 'bg-white text-left'
            }`}
          >
            <p className="text-gray-800 whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {loading && !showHistory && (
          <div className="p-4 rounded-lg bg-white shadow text-left text-gray-500 italic animate-pulse">
            Generating recipe...
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Section (only in chat mode) */}
      {!showHistory && (
        <div className="sticky bottom-0 bg-white w-full px-4 py-4 shadow-inner border-t border-orange-200">
          <div className="flex max-w-3xl mx-auto items-center space-x-4">
            <textarea
              rows="2"
              placeholder="Enter ingredients (e.g., tomato, onion)..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1 p-3 border border-orange-300 rounded-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={handleGenerate}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              {loading ? '...' : 'Generate'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeGPTPage;
