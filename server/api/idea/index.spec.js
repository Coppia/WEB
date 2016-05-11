'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ideaCtrlStub = {
  index: 'ideaCtrl.index',
  show: 'ideaCtrl.show',
  create: 'ideaCtrl.create',
  update: 'ideaCtrl.update',
  destroy: 'ideaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ideaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './idea.controller': ideaCtrlStub
});

describe('Idea API Router:', function() {

  it('should return an express router instance', function() {
    ideaIndex.should.equal(routerStub);
  });

  describe('GET /api/idea', function() {

    it('should route to idea.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ideaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/idea/:id', function() {

    it('should route to idea.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ideaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/idea', function() {

    it('should route to idea.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ideaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/idea/:id', function() {

    it('should route to idea.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ideaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/idea/:id', function() {

    it('should route to idea.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ideaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/idea/:id', function() {

    it('should route to idea.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ideaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
