const { Videogame, Genre } = require('../db');
const ModelT = require('./modeltemplate');
const genreModel = require('../controllers/genrecont');
require('dotenv').config();//<--
const { API_KEY } = process.env;//<--
const fetch = require('node-fetch');//<--
const bodyParser = require('body-parser');//<--

class VideogameModel extends ModelT {
	constructor(model) {
		super(model);
	}
	async addRelationVgGenre(idVg, idGenre) {
		let vg = await this.model.findByPk(idVg);
		//console.log(vg);
		let genre = await Genre.findByPk(idGenre);
		//console.log(genre);
		vg.addGenre(genre);
		return Promise.all([vg, genre])
			.then(results => {
				const [vg, genre] = results;
				//console.log(vg, genre);
				return vg.addGenre(genre);
			})
			.catch(error => console.log(error));
	}

	async createVideogameTable() {

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

		// Función que toma el arreglo de datos de c/videojuego
		// y devuelve otro arreglo que solo contiene los datos necesarios.
		async function specifData(arr) {
			let data = arr;
			let sgames = await Promise.all(
				data.map(async e => {
					let { id: apId, name, rating, background_image: img_url, released, platforms, genres } = e;
					// let newgenres = genres.map(e => e.name); // CAMBIAR!!!
					let newgenres = await Promise.all(genres.map(async e => {

						// gen es el id de género correspondiente en la DB
						let gen = await genreModel.get({ where: { name: e.name } })
							.then(g => {
								return g[0];
							})
							.then(o => {
								return o.dataValues.id;
							})
							.catch(error => console.log(error));

						return gen;
					}));
					let newplatforms = platforms.map(e => e.platform.name);
					let description = await getdescription(apId, API_KEY); // Obtiene descripción de otra URL
					let obj = { apId, name, rating, img_url, released, description, platforms: newplatforms, genres: newgenres };
					return obj;
				})
			)
			return sgames;
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
	
		// Función que reune los 100 primeros juegos.// Lo reduje a 20
		async function get100first() {
			let g = [];
			for (let i = 1; i < 2; i++) {
				let arr = await BringMe20(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
				g = g.concat(arr);
			}
			return g;
		}

		let games = await get100first(); // game = { apId, genres , name, rating, img_url, released, description, platforms}
		
		games.forEach(async e => {

			let genArrPks = e.genres; // [3,6]
			let {name, rating, img_url, released, description, platforms} = e;

			await this.model.create({name, rating, img_url, released, description, platforms})
				.then(vg => {
					genArrPks.forEach(g => vg.addGenre(g))
				})
		})
		console.log('Se creó la tabla de videojuegos.')
	}
}

const videogameModel = new VideogameModel(Videogame);

module.exports = videogameModel;
