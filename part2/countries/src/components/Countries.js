import Country from './Country';
import Filter from './Filter';

const Countries = ({ countries, setSearch}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  if (countries.length > 1) {
    return countries.map(country => (
      <Filter key={country.name} country={country} setSearch={setSearch} />
    ))
  }

  return (
    <div>No countries match your search!</div>
  )
};

export default Countries;
