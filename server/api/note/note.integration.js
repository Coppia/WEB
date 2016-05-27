'use strict';

var app = require('../..');
import request from 'supertest';

var newNote;

describe('Note API:', function() {

  describe('GET /api/note', function() {
    var notes;

    beforeEach(function(done) {
      request(app)
        .get('/api/note')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          notes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      notes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/note', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/note')
        .send({
          name: 'New Note',
          description: 'This is the brand new note!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNote = res.body;
          done();
        });
    });

    it('should respond with the newly created note', function() {
      newNote.name.should.equal('New Note');
      newNote.description.should.equal('This is the brand new note!!!');
    });

  });

  describe('GET /api/note/:id', function() {
    var note;

    beforeEach(function(done) {
      request(app)
        .get('/api/note/' + newNote._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          note = res.body;
          done();
        });
    });

    afterEach(function() {
      note = {};
    });

    it('should respond with the requested note', function() {
      note.name.should.equal('New Note');
      note.description.should.equal('This is the brand new note!!!');
    });

  });

  describe('PUT /api/note/:id', function() {
    var updatedNote;

    beforeEach(function(done) {
      request(app)
        .put('/api/note/' + newNote._id)
        .send({
          name: 'Updated Note',
          description: 'This is the updated note!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNote = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNote = {};
    });

    it('should respond with the updated note', function() {
      updatedNote.name.should.equal('Updated Note');
      updatedNote.description.should.equal('This is the updated note!!!');
    });

  });

  describe('DELETE /api/note/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/note/' + newNote._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when note does not exist', function(done) {
      request(app)
        .delete('/api/note/' + newNote._id)
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
