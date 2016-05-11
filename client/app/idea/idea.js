'use strict';

angular.module('coppiaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('idea', {
        url: '/idea',
        template: '<idea></idea>'
      });
  });
