(function () {
  "use strict";
  angular
    .module('main', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/posts', {
          templateUrl: 'views/set.html',
          controller: 'MainController'
        })
        .when('/404', {
          template: '<h1>Sorry, page not found</h1>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    });

})();
