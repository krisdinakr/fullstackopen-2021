import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addContact = (event) => {
    event.preventDefault();

    const newContactObj = {
      key: newName,
      name: newName,
      number: newNumber
    };

    const checkDuplicate = persons.find(person => person.name.toLowerCase().includes(newName.toLowerCase()));

    if (checkDuplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newContactObj));
    }

    setNewName('');
    setNewNumber('');
  }

  const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addContact={addContact} />
      <h2>Numbers</h2>
      <Persons result={result} />
    </div>
  )
}

export default App;
