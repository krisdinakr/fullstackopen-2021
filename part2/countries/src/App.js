import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => setCountries(response.data))
  }, []);

  

  const Result = ({ countries }) => {
    const result = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

    if (search) {
      if (result.length === 1) {
        return (
          <div>
            {result.map(country => {
              return <div key={country.numericCode}>
                        <h1>{country.name}</h1>
                        <p>capital {country.capital}</p>
                        <p>population {country.population}</p>
                        <h2>languages</h2>
                        <ul>
                          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                        </ul>
                        <img src={country.flag} alt={country.name} width="100"/>
                      </div>
            })}
          </div>
        )
      } else if (result.length > 10) {
        return (
          <p>Too many matches, specify another filter</p>
        )
      } else {
        return (
          <div>
            {result.map(country => <p key={country.numericCode}>{country.name}</p>)}
          </div>
        )
      }
    } else {
      return (
        <>
        </>
      )
    }
  }

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Result countries={countries} />
    </div>
  )
}

export default App;
