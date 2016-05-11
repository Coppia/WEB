'use strict';

describe('Component: InterviewComponent', function () {

  // load the controller's module
  beforeEach(module('coppiaApp'));

  var InterviewComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    InterviewComponent = $componentController('InterviewComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
