import React, { useState } from 'react';

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
        setMessages((prev) => [...prev, { sender: 'bot', text: 'may prob sa server' }]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'not connected to backend server.' }]);
    }
  };

  return (
    <div style={styles.chatWidgetContainer}>
      {/* Kapag sarado ang chat, ipakita ang floating button */}
      {!isOpen && (
        <button 
          style={styles.chatToggleBtn} 
          onClick={() => setIsOpen(true)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.chatToggleBtnHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.chatToggleBtn.backgroundColor}
        >
          💬 AI Chat
        </button>
      )}

      {/* Kapag bukas ang chat, ipakita ang window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Gemini AI Assistant</span>
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div style={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.message, 
                  ...(msg.sender === 'user' ? styles.messageUser : styles.messageBot)
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form style={styles.chatInputForm} onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Your questions..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              style={styles.chatInput}
            />
            <button 
              type="submit" 
              style={styles.chatButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.chatButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.chatButton.backgroundColor}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Inline Styles Object
const styles = {
  chatWidgetContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  },
  chatToggleBtn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  chatToggleBtnHover: {
    backgroundColor: '#2563eb',
  },
  chatWindow: {
    width: '320px',
    height: '400px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatHeader: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
  chatMessages: {
    flex: 1,
    padding: '12px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#f9fafb',
  },
  message: {
    padding: '8px 12px',
    borderRadius: '8px',
    maxWidth: '80%',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  messageUser: {
    backgroundColor: '#3b82f6',
    color: 'white',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '2px',
  },
  messageBot: {
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '2px',
  },
  chatInputForm: {
    display: 'flex',
    padding: '8px',
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb',
  },
  chatInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '14px',
  },
  chatButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 14px',
    marginLeft: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  chatButtonHover: {
    backgroundColor: '#2563eb',
  },
};