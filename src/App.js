import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CodeSatori is coming soon.
        </p>
        <div className="App-subtitle">
          <p>
            Enlightenment is just around the corner...
          </p>
        </div>
        <audio autoPlay loop>
              <source src="/waves2.mp3" />
        </audio>
      </header>
    </div>
  );
}

export default App;
