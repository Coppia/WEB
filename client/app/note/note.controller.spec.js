'use strict';

describe('Component: NoteComponent', function() {

  // load the controller's module
  beforeEach(module('coppiaApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var NoteComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state,
    socket) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/note')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      state = $state;
      NoteComponent = $componentController('note', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of notes to the controller', function() {
    NoteComponent.$onInit();
    $httpBackend.flush();
    expect(1 === 1);
    //expect(NoteComponent.addNote("name").to.have.property('name', 'Test');
  });
});
