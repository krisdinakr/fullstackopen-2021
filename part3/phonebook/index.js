const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (req) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

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

const generateId = () => Math.floor(Math.random() * 100);

app.get('/api/persons', (req, res) => {
  if (persons.length < 1) {
    return res.status(200).send('No data');
  }
  return res.status(200).json(persons);
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing'})
  }

  const duplicate = persons.find(i => i.name.toLowerCase() === name.toLowerCase());

  if (duplicate) {
    return res.status(400).json({ error: 'name must be unique'});
  }

  const person = {
    id: generateId(),
    name,
    number
  }

  persons = persons.concat(person);

  return res.status(200).json(person);
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(i => i.id === Number(id));
  if (!person) {
   return res.status(404).send('Not found')
  }

  return res.status(200).json(person);
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  persons = persons.filter(i => i.id !== Number(id));

  res.status(204).end();
})

app.get('/info', (req, res) => {
  const amount = persons.length;
  res.status(200).send(`<p>Phonebook has info for ${amount} people</p>
  <p>${new Date()}</p>`);
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
