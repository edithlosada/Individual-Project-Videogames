const { Router } = require('express');
const { Genre, Videogame } = require('../../db');
const bodyParser = require('body-parser');
const router = Router();

//--------------------(5) POST /newvideogame/-------------------------------
// http://localhost:3001/newvideogame/
router.post('/', async function (req, res) {

  try {

    const { title: name, released, description, rating, genres, platforms} = req.body;
    // console.log(req.body);  
    // console.log({ name, released, description, rating, genres, platforms});

    if (req.body) {

      // console.log(genres);

      let genresId = await Promise.all(genres.map(async g => {
        return Genre.findOrCreate({ where: { name: g } })
          .then(resp => {
            let data = resp[0].dataValues;
            return data;
          })
          .then(data => {
            return data.id;
          })
      }))
      // console.log(genresId);

      await Videogame.create({ name, rating, released, description, platforms })
        .then(vg => {
          genresId.forEach(gId => vg.addGenre(gId))
        })
        .catch(error => console.log(error))
    }

    res.send('Recibido OK');// Lo manda al front!!!

  } catch (error) {
    res.sendStatus(500);
  }

})

module.exports = router;