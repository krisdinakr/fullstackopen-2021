import Weather from './Weather';

const Country = ({ country }) => (
<div key={country.numericCode}>
  <h1>{country.name}</h1>
  <p>capital {country.capital}</p>
  <p>population {country.population}</p>
  <h2>languages</h2>
  <ul>
    {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
  </ul>
  <img src={country.flag} alt={country.name} width="100"/>
  <Weather country={country} />
 </div>
)

export default Country;
