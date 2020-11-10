import React from 'react';
import MyComponent from '../MyComponent';
import './App.css';

function App() {
  const onChange = () => {
    console.log('on Change ');
  };

  return (
    <div className="App">
      <MyComponent
        onChange={ onChange }
      />
    </div>
  );
}

export default App;
