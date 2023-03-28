'use strict';

const Cat = require('../models/cat.js');

async function deleteCat(request,response,next){
  try {
    let id = request.params.catID;

    await Cat.findByIdAndDelete(id);

    response.status(200).send('Cat Deleted!');
  } catch (error) {
    next(error);
  }
}


async function getCats(request, response, next){
  // TODO: Get all cats from db
  try {
    let allCats = await Cat.find({}); // Model.find({}) - retreives all docs from database

    response.status(200).send(allCats);

  } catch (error) {
    next(error);
  }
}

async function postCat(request, response,next){
  try {
    let createdCat = await Cat.create(request.body);

    response.status(201).send(createdCat);
  } catch (error) {
    next(error);
  }
}

module.exports = { deleteCat, getCats, postCat };
