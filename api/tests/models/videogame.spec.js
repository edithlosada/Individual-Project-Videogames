const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame db model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
        	platforms: ['PC']
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	platforms: ['PC']
        });
      });
    });
    describe('rating', () => {
      it('should throw an error if rating is not a number', (done) => {
        Videogame.create({
         	name: 'Tomb Rider',
        	rating: '4.06', 
        	genres: ['Action','Adventure'], 
        })
          .then(() => done(new Error('It requires a number')))
          .catch(() => done());
      });
      it('should work when rating is a number', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	rating: 4.06, 
        	platforms: ['PC']
        });
      });
    });
    describe('platform', () => {
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({
         	name: 'Tomb Rider',
        	released: '2013-03-05', 
        	description: 'A cinematic revival of the series', 
        	rating: 4.06, 
        	genres: ['Action','Adventure'], 
        })
          .then(() => done(new Error('It requires at least one valid platform')))
          .catch(() => done());
      });
      it('should throw an error is platforms is a string', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	platforms: 'PC - Xbox'
        })
        .then(() => done(new Error('It requires  platforms to be an array')))
        .catch(() => done());
      });
     	it('should throw an error is platforms elements are numbers', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	platforms: [9]
        })
        .then(() => done(new Error('It requires platform elements to be of string type')))
        .catch(() => done());
      });
      it('should throw an error is platforms elements are objects', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	platforms: [{platform: 'Xbox'}]
        })
        .then(() => done(new Error('It requires platform elements to be of string type')))
        .catch(() => done());
      });
      it('should work when platform is an array of strings', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	platforms: ['PC','Xbox']
        })
      });
    });
    describe('genres', () => {
    	it('throws an error when trying to add genres through Videogame model', () => {
        Videogame.create({
        	name: 'Tomb Rider',
        	genres: ['Action','Adventure'], 
        	platforms: ['PC','Xbox']
        })
        .then(() => done(new Error('Genres should be added using Genre model')))
        .catch(() => done());
      });
    });
  });
});
