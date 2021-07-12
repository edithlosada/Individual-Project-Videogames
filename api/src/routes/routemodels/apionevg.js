const { Router } = require('express');
const { Genre , Videogame } = require('../../db');
const router = Router();
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const bodyParser = require('body-parser');//<--

const API_GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`;

//--------------------(3) GET /videogame/:id-------------------------------
// BUSQUEDA POR PARAM
// http://localhost:3001/videogame/5286
router.get('/:id', (req, res) => {
  let id = req.params.id;

  async function getdescription(id, key) {
    let descrip = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
      .then(response => response.json())
      .then(async resp => {
        let desc = resp.description_raw;
        return desc;
      })
      .catch(error => {
        console.log(error);
      });
    return descrip;
  }

  async function getGameInfo(game) { //[{id: name:},]
    let { id: apId, name, released, background_image: img_url, rating, platforms, genres } = game;
    let newplatforms = platforms.map(e => {
      return e.platform.name;
    });
    let newgenres = [];
    if (genres.length != 0) {
      newgenres = genres.map(e => {
        return e.name;
      });
    }
    let description = await getdescription(apId, API_KEY);
    //console.log(description);
    let obj = { id: apId, name, description, released, img_url, rating, platforms: newplatforms, genres: newgenres };
    //console.log(obj); // obj lo muestra bien!!!
    return obj;
  }

  fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(res => res.json())
    .then(game => getGameInfo(game))
    .then(obj => {
      //console.log(obj);
      res.send(obj)
    })
    .catch(err => console.log('Fetch problem: ' + err.message));
});

module.exports = router;