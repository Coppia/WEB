'use strict';

angular.module('coppiaApp.auth', [
  'coppiaApp.constants',
  'coppiaApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
