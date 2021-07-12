const { Router } = require('express');
const router = Router();
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const bodyParser = require('body-parser');//<--

const API_GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`;

//------------------- GET /apigenres -----------------
// http://localhost:3001/apigenres

const API_GENRES = `https://api.rawg.io/api/genres?key=${API_KEY}`;

router.get('/', async (req, res) => {
  fetch(API_GENRES)
    .then(res => res.json())
    .then(json => json.results)
    .then(arr => {
      let genres = arr.map(e =>{
        return e.name;
      })
      return genres;
    })
    .then(gen => {
      //console.log(obj);
      res.send(gen)
    })
    .catch(err => console.log('Fetch problem: ' + err.message));
})


module.exports = router;