'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();


app.use(cors());


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));


app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

/*
 *** FOR YOUR LAB - WEATHER
 *** http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&days=5&units=I


 *** FOR YOUR LAB - MOVIES ***
 *** https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
*** images: https://image.tmdb.org/t/p/w500/<poster path>

class Movie{
  constructor(movieOb){
    this.title = 
    this.overview =
    this.image = `https://image.tmdb.org/t/p/w500${movieOb.poster_path}`
  }
}
*/



// TODO: BUILD AN ENDPOINT THAT WILL CALL OUT TO AN API
app.get('/photos', async (request, response, next) => {
  try {
    // TODO: accept my queries -> /photos?searchQuery=Value
    let keywordFromFrontEnd = request.query.searchQuery;

    // TODO: build my url for axios
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${keywordFromFrontEnd}`;

    let photoResults = await axios.get(url);

    // TODO: groom that data and send it to the frontend
    let photosToSend = photoResults.data.results.map(pic => new Photo(pic));

    response.status(200).send(photosToSend);
  } catch (error) {
    next(error);
  }
});


// TODO: BUILD ANOTHER CLASS TO TRIM DOWN THAT DATA
class Photo {
  constructor(picObj){
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.username = picObj.user.name;
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
