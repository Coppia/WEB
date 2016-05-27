'use strict';

describe('Component: InterviewComponent', function() {

  // load the controller's module
  beforeEach(module('coppiaApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var InterviewComponent;
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
      $httpBackend.expectGET('/api/interview')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      state = $state;
      InterviewComponent = $componentController('interview', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of interviews to the controller', function() {
    InterviewComponent.$onInit();
    $httpBackend.flush();
    expect(InterviewComponent.interviews.length).toBe(4);
  });
});
