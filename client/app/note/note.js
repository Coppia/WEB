'use strict';

angular.module('coppiaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('note', {
        url: '/note',
        template: '<note></note>'
      });
  });
