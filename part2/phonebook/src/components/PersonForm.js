import React from 'react';

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addContact }) => (
  <form>
    <div>
      name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit" onClick={addContact}>add</button>
    </div>
  </form>
)

export default PersonForm;