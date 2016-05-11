'use strict';

angular.module('coppiaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interview', {
        url: '/interview',
        template: '<interview></interview>'
      });
  });
