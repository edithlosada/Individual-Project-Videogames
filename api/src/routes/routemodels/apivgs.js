const { Router } = require('express');
const router = Router();
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const bodyParser = require('body-parser');//<--

const API_GAMES = `https://api.rawg.io/api/games?key=${API_KEY}`;


//-------------------(1 y 2) GET /videogames y /videogames?name="..."---------------
// http://localhost:3001/videogames
// http://localhost:3001/videogames?name=tomb
router.get('/', async (req, res) => {

  // Función que convierte el arreglo de géneros a un string.
  function genresToString(arr) { // arr = [{id:4 , name: 'action' , }, {}]
    let genrenames = arr.map(e => {
      return e.name;
    })
    // let s = `${genrenames.toString().replace(/,/g, ', ')}`;
    let s = genrenames.toString().replace(/,/g, ', ');
    return s;
  }

  // Función que toma el arreglo de datos de c/videojuego
  // y devuelve otro arreglo que solo contiene los datos necesarios.
  function specifData(arr) {
    let data = arr;
    let pagegames = data.map(e => {
      let { id, name, rating, background_image: img_url, genres } = e;
      let genrestr = '';
      if (genres.length != 0) {
        genrestr = genresToString(genres);
      } else return '';
      let obj = { id, name, rating, img_url, genres: genrestr };
      return obj;
    })
    return pagegames;
  }

  // Función que se trae los juegos de una página solo con los datos necesarios.
  async function BringMe20(page) {
    let arr = await fetch(page)
      .catch(error => {
        console.log(error);
      });
    let arrjson = await arr.json();
    let pagedata = await arrjson.results;
    let sarr = await specifData(pagedata);
    return sarr;
  }

  // Función que reune los 100 primeros juegos.
  async function get100first() {
    let g = [];
    for (let i = 1; i < 6; i++) {
      let arr = await BringMe20(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
      g = g.concat(arr);
    }
    return g;
  }

  let games = await get100first();

  //------------Cuando hay query -------------------
  let qword = req.query.name;
  console.log(qword);
  if (qword) {
    // Función que devuelve los juegos filtrados por nombre.
    function filterbyquery(arr, qword) {
      let newarr = arr.filter(e => e.name.toLowerCase().includes(qword.toLowerCase()));
      return newarr;
    }

    let fgames = filterbyquery(games, qword);
    games = fgames;
  }
  res.send(games);
});

//--------------------(3) GET /videogames/:id-------------------------------
// BUSQUEDA POR PARAM
// localhost:3001/API/videogames/5286
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