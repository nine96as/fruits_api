const express = require('express');
const cors = require('cors');

const fruits = require('./fruits');
const logger = require('./logger');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// home page
app.get('/', (req, res) => {
  res.send('Hello reddy!!!!!!!');
});

// list of fruits
app.get('/fruits', (req, res) => {
  res.send(fruits);
});

// specific fruit page
app.get('/fruits/:id', (req, res) => {
  const index = req.params.id - 1;
  const fruit = fruits[index];

  if (!fruit) res.status(404).send({ error: 'Fruit not found' });
  res.status(200).send(fruit);
});

// create fruits
app.post('/fruits', (req, res) => {
  console.log('server line 38', req.body);
  const fruit = req.body;
  const lastFruit = fruits[fruits.length - 1];

  const lastId = lastFruit ? lastFruit.id + 1 : 1;
  fruit.id = lastId;

  fruits.push(fruit);
  res.status(201).send(fruit);
});

// update specific fruit
app.patch('/fruits/:id', (req, res) => {
  const index = req.params.id - 1;
  const fruit = fruits[index];

  if (!fruit) res.status(404).send({ error: 'Fruit not found' });

  fruit.name = req.body.name;
  res.status(200).send(fruit);
});

// delete specific fruit
app.delete('/fruits/:id', (req, res) => {
  const index = req.params.id - 1;
  const fruit = fruits[index];

  if (!fruit) res.status(404).send({ error: 'Fruit not found' });
  fruits.splice(index, 1);

  res.status(200).send(fruit);
});

module.exports = app;
