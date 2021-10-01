import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => setCountries(response.data))
  }, []);

  const searchHandle = (e) => setSearch(e.target.value);

  const result = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Search search={search} searchHandle={searchHandle} />
      <Countries countries={result} setSearch={setSearch} />
    </div>
  )
}

export default App;
