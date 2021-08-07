import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addContact = (event) => {
    event.preventDefault();

    const newContactObj = {
      name: newName,
      key: newName
    };
    
    const checkDuplicate = persons.find(contact => contact.name === newName);

    if (checkDuplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newContactObj));
    }

    setNewName('');
  }

  const changeHandler = (event) => {
    setNewName(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={changeHandler} />
        </div>
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App;
