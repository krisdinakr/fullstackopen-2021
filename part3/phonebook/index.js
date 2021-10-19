require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { PORT } = process.env;
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        res.json(persons);
      } else {
        res.send('No data');
      }
    })
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ error: 'name or number is missing' });
  }

  const person = new Person({
    name,
    number,
  });

  person.save()
    .then((savedPerson) => res.status(200).json(savedPerson))
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const { id } = req.params;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.status(200).json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.get('/info', async (req, res, next) => {
  Person.find().estimatedDocumentCount()
    .then((amount) => {
      if (amount) {
        res.status(200).send(`<p>Phonebook has info for ${amount} people</p>
        <p>${new Date()}</p>`);
      } else {
        res.status(200).send(`<p>Phonebook has no data yet</p>
        <p>${new Date()}</p>`);
      }
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' });

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  console.log('thisIsERROR', err);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
