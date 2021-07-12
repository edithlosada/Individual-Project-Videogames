const videogameModel = require('../controllers/vgamecont');
//const { Videogame , Genre } = require('../db');

const identif = [[1,1],[1,6],[2,1],[2,6],[3,1],[3,6],[4,6],[4,9],[5,1],[5,3],[6,1],[6,2],[6,3],[6,9],[6,11],[7,1],[7,6],[8,1],[8,4],[8,6],[9,1],[9,3],[9,9],[10,1],[10,4],[11,1],[11,6],[12,1],[12,6],[13,1],[13,6],[14,3],[15,1],[15,3],[16,1],[16,4],[17,1],[17,3],[18,1],[18,3],[18,4],[19,1],[19,6],[20,1],[20,3]];

function relateIds (arr) {
  for (i = 0; i < arr.length; i++) {
    let [idVg,idGenre] = arr[i];
    videogameModel.addRelationVgGenre(idVg,idGenre);
  }
}

const identities = relateIds(identif);

module.exports = identities;