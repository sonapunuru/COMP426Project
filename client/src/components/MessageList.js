import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch the messages from the server-side API endpoint
    axios.get('/api/messages')
      .then(response => {
        // update the state with the messages data
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <h2>{message.title}</h2>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;

