const { Genre } = require('../db');
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const ModelT = require('./modeltemplate');

const API_GENRES = `https://api.rawg.io/api/genres?key=${API_KEY}`;

class GenreModel extends ModelT {
  constructor(model) {
    super(model);
  }
  async createGenreTable() {
    fetch(API_GENRES)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
          //throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        let apigeneros = data.results;
        let arr = apigeneros.map(gen => { //[{id: name:},]
          let { id: apId, name } = gen;
          //apId= gen.id
          Genre.create({ apId, name });
        })
      })
      .then(res => console.log('Se creó la tabla de géneros.'))
      .catch(error => {
        console.log(error);
      });
  }
}

const genreModel = new GenreModel(Genre);

module.exports = genreModel;
