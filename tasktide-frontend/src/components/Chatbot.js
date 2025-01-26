import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <div>
      <div onClick={toggleChatbot} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#ff5c8d',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <span style={{ color: '#fff', fontSize: '20px' }}>?</span>
      </div>
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          background: '#fff',
          width: '300px',
          height: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
        }}>
          <h4>Chatbot</h4>
          <div style={{ marginBottom: '10px' }}>
            <p><strong>How to use the dashboard?</strong></p>
            <p>Click on the menu options to navigate through your dashboard...</p>
          </div>
          <div>
            <p><strong>Troubleshooting</strong></p>
            <p>If you're facing issues, try restarting the app...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
