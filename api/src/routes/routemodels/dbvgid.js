const { Router } = require('express');
const { Genre , Videogame } = require('../../db');
const bodyParser = require('body-parser');//<--
const router = Router();

//--------------------GET /dbvideogame/:id ------------------------
// http://localhost:3001/dbvideogame/:id
router.get('/:id', async (req, res) => {
  let id = req.params.id;

  Videogame.findByPk(id, {
    include: [{
      attributes: ['name'],
      model: Genre,
    }]
  })
    .then(resp => {
      let data = resp.dataValues;
      return data;
    })
    .then(data => {
      let { id, name, description, released, img_url, rating, platforms, genres } = data;
      let genrenames = genres.map(e => e.name);
      let str = `${genrenames.toString().replace(/,/g, ', ')}`;
      return { id, name, description, released, img_url, rating, platforms, genres: str }
    })
    .then(vginfo => {
      res.send(vginfo);
    })
    .catch(error => console.log(error))
});

module.exports = router;
