import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

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
            setPersons(persons.map(person => person.id !== checkDuplicate.id ? person : newContactObj));
            setNotification(['success', `${newName}'s Number Updated`])
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(err => {
            setNotification(['error', `Information of ${newName} has already been removed from server`]);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
      }
    } else {
      personsService.create(newContactObj)
        .then(newContactObj => {
          setPersons(persons.concat(newContactObj));
          setNotification(['success', `Added ${newName}`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(err => {
          setNotification(['error', 'Add contact failed']);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
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
          setNotification(['success', `${contact.name} deleted from contact`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(err => {
          setNotification(['error', `Information of ${contact.name} has already been removed from server`]);
          setTimeout(() => {
            setNotification(null);
          }, 5000)
        })
    } 
  }

  const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addContact={addContact} />
      <h2>Numbers</h2>
      <Persons result={result} deleteContact={deleteContact} />
    </div>
  )
}

export default App;
