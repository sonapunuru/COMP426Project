import React from 'react';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';

const App = () => {
  return (
    <div>
      <MessageForm />
      <MessageList />
    </div>
  );
};

export default App;

