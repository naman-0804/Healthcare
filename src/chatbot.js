import React, { useState } from 'react';
import './chatbot.css';
const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = () => {

    if (message.toLowerCase().startsWith('working hour')) {
      setResponse('Our working hours are Monday to Friday, 9:00 AM to 5:00 PM.');
    } else if (message.toLowerCase().startsWith('holiday')) {
      setResponse('We are closed on national holidays.');
    } else if (message.toLowerCase().startsWith('working days')) {
      setResponse('Yes, we are open on all weekdays.');
    } else if (message.toLowerCase().startsWith('weekends')) {
      setResponse('We are closed on weekends.');
    } else {
      setResponse('Sorry, I didn\'t understand your question.');
    }
  };

  return (
    <div className="tet">
      <div className="chathead">Ask your Questions here ? </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button class="send-btn" onClick={handleSendMessage}><span class="btn-text">Send</span>
      <div class="btn-animation">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
    </div>
      </button>
  
  
      {response && <div>{response}</div>}
    </div>
  );
};

export default  Chatbot;