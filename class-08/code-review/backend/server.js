'use strict';

console.log('Yass our first server :)!!');

// *** REQUIRES ***** (Like import but for the backend)
const express = require('express');
require('dotenv').config();
const cors = require('cors');

let weather = require('./data/weather.json');

// * *** ONCE WE BRING IN EXPRESS WE CALL IT TO CREATE THE SERVER ***
// ** app === server
const app = express();

// *** MIDDLEWARE  - CORS ***
app.use(cors());

// *** PORT THAT MY SERVER WILL RUN ON ***
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));

// *** ENDPOINTS ****
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


app.get('/weather', (request, response, next) => {
  try {
    // /weather?lat=Value&lon=Value&searchQuery=Value
    // TODO: accept queries - lat, lon, searchQuery
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.searchQuery;

    console.log(request.query);

    // TODO: find that city based on cityName - json

    let city = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());

    // TODO: send city into this class to be groomed

    let weatherToSend = city.data.map(day => new Forecast(day));

    response.status(200).send(weatherToSend);

  } catch (error) {
    next(error);
  }
});

// TODO: Build my class to groom this data
// *** CLASS TO GROOM BULKY DATA ***
class Forecast {
  constructor(dayObj){
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}


// *** CATCH ALL - AT THE BOTTOM AND SERVE AS A 404 ERROR MESSAGE
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
