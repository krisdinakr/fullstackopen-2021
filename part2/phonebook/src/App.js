import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService.getAll()
      .then(data => setPersons(data));
  }, [])

  const addContact = (event) => {
    event.preventDefault();

    const newContactObj = {
      name: newName,
      number: newNumber
    };

    const checkDuplicate = persons.find(person => person.name.toLowerCase().includes(newName.toLowerCase()));

    if (checkDuplicate) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        personsService.update(checkDuplicate.id, newContactObj)
          .then(newContactObj => {
            setPersons(persons.map(person => person.id !== checkDuplicate.id ? person : newContactObj))
          })
      }
    } else {
      personsService.create(newContactObj)
        .then(newContactObj => setPersons(persons.concat(newContactObj)))
        .catch(err => console.log(err));
    }

    setNewName('');
    setNewNumber('');
  }

  const deleteContact = (id) => {
    const contact = persons.find(i => i.id === id);
    const confirm = window.confirm(`Delete ${contact.name}?`);
    if (confirm) {
      personsService.remove(id)
        .then(() => {
          const newPersons = persons.filter(i => i !== contact);
          setPersons(newPersons);
        })
        .catch(err => console.log(err));
    } 
  }

  const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addContact={addContact} />
      <h2>Numbers</h2>
      <Persons result={result} deleteContact={deleteContact} />
    </div>
  )
}

export default App;
