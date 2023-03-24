'use strict';

const axios = require('axios');

let cache = {};


// TODO: need to create a key for the data I am going to store
// TODO: if the thing exists AND within a valid timeframe ... send that data from cache
// TODO: if the thing does not exist - call my API and cache that return from the API

async function getPhotos(request, response, next) {
  try {
    let keywordFromFrontEnd = request.query.searchQuery;

    let key = `${keywordFromFrontEnd}-Photo`; // key = seattle-Photo

    if (cache[key] && (Date.now() - cache[key].timestamp) < 10000) {
      console.log('Cache was hit!', cache);

      response.status(200).send(cache[key].data);

    } else {

      console.log('No items in cache');

      let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${keywordFromFrontEnd}`;

      let photoResults = await axios.get(url);

      let photosToSend = photoResults.data.results.map(pic => new Photo(pic));

      // **** BUILD IT INTO CACHE ****

      cache[key] = {
        data: photosToSend,
        timestamp: Date.now()
      };

      response.status(200).send(photosToSend);
    }

  } catch (error) {
    next(error);
  }
}

class Photo {
  constructor(picObj) {
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.username = picObj.user.name;
  }
}

module.exports = getPhotos;


