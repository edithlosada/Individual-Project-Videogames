const { Router } = require('express');
const router = Router(); 
const cors = require('cors');
const apivgs = require('./routemodels/apivgs');
const apionevg = require('./routemodels/apionevg');
const dbg = require('./routemodels/dbgenres');
const nvg = require('./routemodels/nvg');
const dbvgs = require('./routemodels/dbvgs');
const dbvgid = require('./routemodels/dbvgid');
const apig = require('./routemodels/apigenres');
// const prueba = require('./routemodels/prueba');

//--------------------------------------
router.use('/videogames', apivgs);
router.use('/videogame', apionevg);
router.use('/genres', dbg);
router.use('/newvideogame', nvg);
router.use('/dbvideogames', dbvgs);
router.use('/dbvideogame', dbvgid);
router.use('/apigenres', apig);
// router.use('/prueba', prueba);

router.get('/', async (req, res) => {
  res.send('root page')
})

module.exports = router;

// {
//   "title": "Tomb Raider (2013)",
//   "description": "A cinematic revival of the series in its action third person form, Tomb Rider follows Lara in her least experience period of life – her youth. Heavily influenced by Naughty Dog’s “Uncharted”, the game is a mix of everything, from stealth and survival to combat and QTE action scenes.",
//   "released": "2013-03-05",
//   "img_url": "https://media.rawg.io/media/games/ad2/ad2ffdf80ba993654f31da045bc02456.jpg",
//   "rating": 4.06,
//   "platforms": [
//   "PC",
//   "PlayStation 4",
//   "PlayStation 3",
//   "Xbox 360",
//   "Xbox One",
//   "macOS"
//   ],
  // "genres": [
  // "Action",
  // "Adventure"
  // ]
//   }
