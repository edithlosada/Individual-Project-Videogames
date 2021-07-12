const { Router } = require('express');
const { Genre } = require('../../db');
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const bodyParser = require('body-parser');//<--
const videogameModel = require('../../controllers/vgamecont');
const genreModel = require('../../controllers/genrecont');
const router = Router();

videogameModel.createVideogameTable();


//--------------------GET /dbvideogames ------------------------
// http://localhost:3001/dbvideogames/
router.get('/', async (req, res) => {

  videogameModel.get({
    include: [{
      attributes: ['name'],
      model: Genre,
    }]})
    .then(resp => { // [vg1,vg2,...]
      let data = resp.map(e => e.dataValues);
      return data;
    })
    .then( data => {

      let vgs = data.map( vg => {
        let { id, name, description, released, img_url, rating, platforms, genres } = vg;
        let genrenames = genres.map(e => e.name);
        let str = `${genrenames.toString().replace(/,/g, ', ')}`;
        return { id, name, description, released, img_url, rating, platforms, genres: str }
      })

      return vgs;
    })
    .then(vgs => res.send(vgs))
    .catch(error => console.log(error));
});

module.exports = router;



















router.get('/', function (req, res, next) {
  genreModel.get()
    .then(resp => {//resp = [g1,g2,...]
      let g = resp.map(e => e.dataValues);
      return g
    })
    //.then(g => console.log(g))
    .then(g => res.send(g))
    .catch(error => console.log(error));
});

// Genre.findAll()
// .then(async g => {
//   console.log(g[0].dataValues.genres);
// })
// .catch(error => console.log(error));

// // En ruta: http://localhost:3001/dbgenres
// router.get('/', function (req, res) {
//   genreModel.get()
//   .then(data => {
//       console.log(data);
//     })
//   //res.send('Acá tabla de géneros.')

// })

module.exports = router;

// Videogame.findOne({
// 	where: {title: 'lalala'},
// 	attibutes: ['id', ['name','title']]
// }).then(vg => {...})

// Videogame.findByPk(123).then(vg => {...})

// const vg = await Videogame.create({obj});

// const busqueda = await Videogame.findAll({
// 	where: {title: "mario"},
// 	attibutes: ['title']
// });
//console.log(busqueda)