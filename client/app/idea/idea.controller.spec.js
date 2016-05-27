'use strict';

describe('Component: IdeaComponent', function() {

  // load the controller's module
  beforeEach(module('coppiaApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var IdeaComponent;
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
      $httpBackend.expectGET('/api/idea')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      state = $state;
      IdeaComponent = $componentController('idea', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of ideas to the controller', function() {
    IdeaComponent.$onInit();
    $httpBackend.flush();
    expect(IdeaComponent.ideas.length).toBe(4);
  });
});
