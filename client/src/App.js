import './App.css';
import React from 'react';
import CrushList from './components/CrushList';
import CrushForm from './components/CrushForm';

const App = () => {
  return (
    <div>
      <CrushForm />
      <CrushList />
    </div>
  );
};

export default App;
