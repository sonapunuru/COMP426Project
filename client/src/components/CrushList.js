import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrushList() {
  const [messages, setMessages] = useState([]);

  //console.log("messages", messages);

  useEffect(() => {
    // fetch the messages from the server-side API endpoint
    axios.get('http://localhost:9000/getCrushes')
      .then(response => {
        // update the state with the messages data
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  

  return (
    <div id="result">
      {messages.map(message => (
        <div key ={message.id}>
          <h2>{message.Crush}</h2>
          <p>{message.Message}</p>
        </div>
      ))}
    </div>
  );
}

export default CrushList;

