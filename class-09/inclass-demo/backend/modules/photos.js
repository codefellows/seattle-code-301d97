'use strict';

const axios = require('axios');


// *** Example of refactor but not needed for lab!! *** 
// function getPhotosRefactor(request, response, next) {

//   let keywordFromFrontEnd = request.query.searchQuery;

//   let baseUrl = `https://api.unsplash.com/search/photos`;

//   let queryStrings = {
//     client_id: process.env.UNSPLASH_API_KEY,
//     query: keywordFromFrontEnd
//   };

//   axios.get(baseUrl, { params: queryStrings })
//     .then(photoResults => photoResults.data.results.map(pic => new Photo(pic)))
//     .then(photosToSend => response.status(200).send(photosToSend))
//     .catch(error => next(error));
// }




async function getPhotos (request, response, next){
  try {
    let keywordFromFrontEnd = request.query.searchQuery;

    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${keywordFromFrontEnd}`;

    let photoResults = await axios.get(url);

    let photosToSend = photoResults.data.results.map(pic => new Photo(pic));

    response.status(200).send(photosToSend);
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


