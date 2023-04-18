import React, { useState } from 'react';
import axios from 'axios';

const CrushForm = () => {
  const [crush, setCrush] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:9000/postCrush', { crush, message })
      .then(response => {
        console.log(response.data);
        setCrush('');
        setMessage('');
      })
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="crush">Crush:</label>
        <input
          type="text"
          id="crush"
          value={crush}
          onChange={event => setCrush(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
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

export default CrushForm;

