const { Router } = require('express');
const { Genre , Videogame } = require('../../db');
const bodyParser = require('body-parser');//<--
const router = Router();

//--------------------GET /prueba ------------------------
// http://localhost:3001/prueba
router.get('/', async (req, res) => {
  Videogame.findOne({
    where: {
      name: 'Grand Theft Auto V'
    },
    include: {
      model: Genre
    }
  }).then(vg => {
    res.send(vg);
  })
  .catch(error => console.log(error))
});

module.exports = router;


 // let id = req.params.id;

  // Videogame.findByPk(id, {
  //   include: [{
  //     attributes: ['name'],
  //     model: Genre,
  //   }]
  // })
  //   .then(resp => {
  //     let data = resp.dataValues;
  //     return data;
  //   })
  //   .then(data => {
  //     let { id, name, description, released, img_url, rating, platforms, genres } = data;
  //     let genrenames = genres.map(e => e.name);
  //     let str = `${genrenames.toString().replace(/,/g, ', ')}`;
  //     return { id, name, description, released, img_url, rating, platforms, genres: str }
  //   })
  //   .then(vginfo => {
  //     res.send(vginfo);
  //   })
  //   .catch(error => console.log(error))
