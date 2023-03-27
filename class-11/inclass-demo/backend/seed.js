'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}

  await Cat.create({
    name: 'Ronald',
    color: 'Orange Tabby',
    location: 'Seattle',
    spayNeuter: true
  });

  console.log('Ronald was created!');

  await Cat.create({
    name: 'Karl',
    color: 'Black and Brown Tabby',
    location: 'Rainbow Bridge',
    spayNeuter: true
  });

  console.log('Karl was added');

  await Cat.create({
    name: 'Victor',
    color: 'Black, white, and grey mix',
    location: 'Rainbow Bridge',
    spayNeuter: true
  });

  console.log('Victor was added');

  mongoose.disconnect();
}

seed();
