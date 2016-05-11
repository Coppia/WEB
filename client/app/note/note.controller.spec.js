'use strict';

describe('Component: NoteComponent', function () {

  // load the controller's module
  beforeEach(module('coppiaApp'));

  var NoteComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NoteComponent = $componentController('NoteComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
