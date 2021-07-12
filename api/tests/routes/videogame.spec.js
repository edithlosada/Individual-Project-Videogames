/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { Videogame, conn } = require('../../src/db.js');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe('Routes', function() {
	describe('Genre route', function() {
		before(() => conn.authenticate()
		.catch((err) => {
		  console.error('Unable to connect to the database:', err);
		}));
		it('should get 200', () =>
		    agent.get('/genres').expect(200)
		);
	});

	describe('Videogames route', function() {
	this.timeout(20000);
		it('should get 200', (done) => {
		  this.timeout(8000);
		  agent.get('/videogames').expect(200)
    	setTimeout(done, 8000);
		});
	});
});

