import React from 'react';
import Button from './Button';

const Persons = ({ result, deleteContact }) => (
  <div>
    {result.map(person => (
      <p key={person.name}>
        {person.name} {person.number}
        <span><Button handler={() => deleteContact(person.id)} /></span>
      </p>
    ))}
  </div>
);

export default Persons;