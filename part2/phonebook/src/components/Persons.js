import React from 'react';

const Persons = ({ result }) => (
  <div>
    {result.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </div>
);

export default Persons;