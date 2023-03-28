'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** REQUIRE IN OUR MONGOOSE LIBRARY ***
const mongoose = require('mongoose');

// **** BRING IN MY CAT MODEL ****
const Cat = require('./models/cat.js');

// const { deleteCat, getCats, postCat } = require('./modules/functions.js');

const app = express();

// middleware
app.use(cors());

// ! DON'T FORGET TO BRING THIS IN!!!!!!!!!!
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// **** CONNECT MONGODB USING MONGOOSE ***
// *** PER THE MONGOOSE DOCS - PLUG AND PLAY CODE ****

mongoose.connect(process.env.DB_URL);

// *** HELPFUL FOR TROUBLESHOOTING IN TERMINAL WHY YOU CAN'T CONNECT TO YOUR MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ENDPOINTS
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// *** ENDPOINT TO RETREIVE ALL CATS FROM MY DATABASE ***

app.get('/cats', getCats);

async function getCats(request, response, next){
  // TODO: Get all cats from db
  try {
    let allCats = await Cat.find({}); // Model.find({}) - retreives all docs from database

    response.status(200).send(allCats);

  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO DELETE A CAT FROM MY DATABASE *****
// ! we must have path parameter
// ! path parameter is going to be set with a variable to capture the ID
// ! we use ':' to signify that it is a path parameter

app.delete('/cats/:catID', deleteCat);

async function deleteCat(request,response,next){
  try {
    let id = request.params.catID;

    await Cat.findByIdAndDelete(id);

    response.status(200).send('Cat Deleted!');
  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO ADD A CAT *****

app.post('/cats', postCat);

async function postCat(request, response,next){
  try {
    let createdCat = await Cat.create(request.body);
    // !!! DON'T FORGET THAT MIDDLEWARE ^ ^ ^ ^(line 22)

    response.status(201).send(createdCat);
  } catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


