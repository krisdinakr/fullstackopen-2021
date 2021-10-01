import React from 'react';

const Search = ({ search, searchHandle }) => (
  <div>
    find countries <input value={search} onChange={searchHandle} />
  </div>
)

export default Search;
