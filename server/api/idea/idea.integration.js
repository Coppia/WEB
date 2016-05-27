'use strict';

var app = require('../..');
import request from 'supertest';

var newIdea;

describe('Idea API:', function() {

  describe('GET /api/idea', function() {
    var ideas;

    beforeEach(function(done) {
      request(app)
        .get('/api/idea')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ideas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ideas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/idea', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/idea')
        .send({
          name: 'New Idea',
          description: 'This is the brand new idea!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIdea = res.body;
          done();
        });
    });

    it('should respond with the newly created idea', function() {
      newIdea.name.should.equal('New Idea');
      newIdea.description.should.equal('This is the brand new idea!!!');
    });

  });

  describe('GET /api/idea/:id', function() {
    var idea;

    beforeEach(function(done) {
      request(app)
        .get('/api/idea/' + newIdea._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          idea = res.body;
          done();
        });
    });

    afterEach(function() {
      idea = {};
    });

    it('should respond with the requested idea', function() {
      idea.name.should.equal('New Idea');
      idea.description.should.equal('This is the brand new idea!!!');
    });

  });

  describe('PUT /api/idea/:id', function() {
    var updatedIdea;

    beforeEach(function(done) {
      request(app)
        .put('/api/idea/' + newIdea._id)
        .send({
          name: 'Updated Idea',
          description: 'This is the updated idea!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIdea = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIdea = {};
    });

    it('should respond with the updated idea', function() {
      updatedIdea.name.should.equal('Updated Idea');
      updatedIdea.description.should.equal('This is the updated idea!!!');
    });

  });

  describe('DELETE /api/idea/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/idea/' + newIdea._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when idea does not exist', function(done) {
      request(app)
        .delete('/api/idea/' + newIdea._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
