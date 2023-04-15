import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList() {
  const [messages, setMessages] = useState([]);

  //console.log("messages", messages);

  useEffect(() => {
    // fetch the messages from the server-side API endpoint
    axios.get('/api/messages')
      .then(response => {
        // update the state with the messages data
        setMessages(response.data);
        console.log("THIS IS WORKING YAYAYAYAYAYAYAYAYAY")
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  

  return (
    <div id="result">
      {messages.map(message => (
        <div key ={message.id}>
          <h2>{message.author}</h2>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;

