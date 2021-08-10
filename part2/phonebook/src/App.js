import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])

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
