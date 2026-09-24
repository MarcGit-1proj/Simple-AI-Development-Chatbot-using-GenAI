import React, { useState } from 'react';
import '../styles/Chat.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Marc How may I assist you?" ' }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');

  // Function para i-handle ang pagpapadala ng mensahe papunta sa Flask backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("Send button na-click! Prompt:", inputPrompt);
    if (!inputPrompt.trim()) return;

    const userMessage = { sender: 'user', text: inputPrompt };
    setMessages((prev) => [...prev, userMessage]);
    const currentPrompt = inputPrompt;
    setInputPrompt('');

    try {
      console.log("Nagpapadala ng fetch request sa Flask...");
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data = await response.json();
      console.log("Sagot mula sa Flask:", data);

      if (data.response) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'May error sa server.' }]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Hindi makakonekta sa backend server.' }]);
    }
  };

  return (
    <div className="chat-widget-container">
      {/* Kapag sarado ang chat, ipakita ang floating button */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          💬 AI Chat
        </button>
      )}

      {/* Kapag bukas ang chat, ipakita ang window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Gemini AI Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Your questions..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}