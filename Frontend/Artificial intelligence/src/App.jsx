import React from 'react';
import ChatWidget from './components/chat';

export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.centerSection}>
        <h1 style={styles.heading}>AI Chatbot Project</h1>
        <p style={styles.paragraph}>Artificial intelligence connected to Flask & React by Marc</p>
        
        {/* Ang Chat Widget component */}
        <ChatWidget />
      </div>
    </div>
  );
}

// Inline Styles para sa App.jsx (galing sa lumang App.css)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6',
    margin: 0,
    padding: 0,
  },
  centerSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: '32px 20px',
    textAlign: 'center',
    gap: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1f2937',
    margin: '0 0 10px 0',
  },
  paragraph: {
    fontSize: '1.1rem',
    color: '#4b5563',
    margin: 0,
  },
};