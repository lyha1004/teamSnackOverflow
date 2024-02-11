import React, { useState } from 'react';
import Home from './pages/home';
import GUI from './pages/GUI';
import CountryInfo from './component/countryInfo';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryDescription, setCountryDescription] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div className='App'>
      <Home
        searchInput={searchInput}
        setSelectedCountry={setSelectedCountry}
        setCountryDescription={setCountryDescription}
      />
      <GUI setSearchInput={setSearchInput} setFilter={setFilter}/>
      <CountryInfo
        CountryName={selectedCountry}
        countryDescription={countryDescription}
      />
    </div>
  );
}

export default App;
