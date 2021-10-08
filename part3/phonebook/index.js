const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  if (persons.length < 1) {
    return res.status(200).send('No data');
  }
  return res.status(200).json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(i => i.id === Number(id));
  if (!person) {
   return res.status(404).send('Not found')
  }

  return res.status(200).json(person);
})

app.get('/info', (req, res) => {
  const amount = persons.length;
  res.status(200).send(`<p>Phonebook has info for ${amount} people</p>
  <p>${new Date()}</p>`);
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
