'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var interviewCtrlStub = {
  index: 'interviewCtrl.index',
  show: 'interviewCtrl.show',
  create: 'interviewCtrl.create',
  update: 'interviewCtrl.update',
  destroy: 'interviewCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var interviewIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './interview.controller': interviewCtrlStub
});

describe('Interview API Router:', function() {

  it('should return an express router instance', function() {
    interviewIndex.should.equal(routerStub);
  });

  describe('GET /api/interview', function() {

    it('should route to interview.controller.index', function() {
      routerStub.get
        .withArgs('/', 'interviewCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/interview/:id', function() {

    it('should route to interview.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'interviewCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/interview', function() {

    it('should route to interview.controller.create', function() {
      routerStub.post
        .withArgs('/', 'interviewCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/interview/:id', function() {

    it('should route to interview.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'interviewCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/interview/:id', function() {

    it('should route to interview.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'interviewCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/interview/:id', function() {

    it('should route to interview.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'interviewCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
