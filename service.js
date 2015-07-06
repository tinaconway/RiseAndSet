

(function () {
  'use strict';
  angular
    .module('main')
    .factory('PostsService',function ($http) {

      var url = 'http://api.sunrise-sunset.org/json?lat='

      var getWeather = function (latitude, longitude) {
        return $http.get(url + latitude + '&lng=' + longitude + '&formatted=0');
      };

      return {
        getWeather: getWeather
      };


    });
})();


'&formatted=0'
