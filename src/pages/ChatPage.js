import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css"; // Assuming you style everything here

const RecipeGPTPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleSend = () => {
    if (!query.trim()) return;

    const newMessage = { user: true, text: query };
    setMessages([
      ...messages,
      newMessage,
      { user: false, text: "Generating recipe..." },
    ]);
    setQuery("");

    // Simulated API call
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { user: false, text: `AI Response for: ${newMessage.text}` }
            : msg
        )
      );
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Header with Logout */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>🍲 RecipeGPT</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Chat UI */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user ? "user-msg" : "ai-msg"}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me to generate a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default RecipeGPTPage;
