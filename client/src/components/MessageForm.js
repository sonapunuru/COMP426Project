import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/messages', { author, message })
      .then(response => {
        console.log(response.data);
        setAuthor('');
        setMessage('');
      })
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;

