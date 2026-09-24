import React from 'react';
import ChatWidget from './components/chat'; // Binago mula sa header patungong chat

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>AI Chatbot Project</h1>
      <p>Artificial intelligence connected to Flask&React by Marc </p>
      
      {/* Ang Chat Widget component */}
      <ChatWidget />
    </div>
  );
}

export default App;