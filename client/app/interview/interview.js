'use strict';

angular.module('coppiaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interviews', {
        url: '/interviews',
        template: '<interviews></Interviews>'
      })
      .state('interviews_add', {
        url: '/interview',
        params: { 'new': true },
        template: '<interview></interview>'
      })
      .state('interviews_edit', {
        url: '/interview/:id',
        template: '<interview></interview>'
      });
  });
