const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/Person');

mongoose.connect(process.env.MONGO_URI);

// Create
const person = new Person({
  name: 'John',
  age: 25,
  favoriteFoods: ['pizza', 'pasta']
});

person.save((err, data) => {
  if (err) console.error(err);
  console.log(data);
});
