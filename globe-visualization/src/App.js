import React, { useState } from 'react';
import Home from './pages/home'
import GUI from './pages/GUI';

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className='App'>
      <Home searchInput={searchInput}/>
      <GUI setSearchInput={setSearchInput}/>
    </div>
  );
}

export default App;
