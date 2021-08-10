import React from 'react';

const Search = ({ search, setSearch }) => {
  console.log(search)
  return (
    <div>
      find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
};

export default Search;
