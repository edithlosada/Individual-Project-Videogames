require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const { Genre } = require('../db');//<--

async function createGenreTable () {
  fetch(`https://api.rawg.io/api/genres`)
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
      });
    })
    .then( res => console.log('Se creó la tabla de géneros.'))
    .catch(error => {
      console.log(error);
    });
}

module.exports = createGenreTable;