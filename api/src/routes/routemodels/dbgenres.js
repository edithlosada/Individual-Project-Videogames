const { Router } = require('express');
const genreModel = require('../../controllers/genrecont');
const router = Router();

genreModel.createGenreTable(); // Crea inicialmente la tabla trayendo los géneros desde la API

//-------------------(4) GET /genres ----------------------
//http://localhost:3001/genres
router.get('/', function(req, res, next) {

  genreModel.get()
    .then(resp => {//resp = [g1,g2,...]
    let g = resp.map(e => e.dataValues);
    return g 
    }) 
  //.then(g => console.log(g))
  .then(g => res.send(g))
  .catch(error => console.log(error));
});

module.exports = router;