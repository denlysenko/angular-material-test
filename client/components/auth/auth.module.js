'use strict';

angular.module('projApp.auth', [
  'projApp.constants',
  'projApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
