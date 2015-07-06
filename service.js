

(function () {
  'use strict';
  angular
    .module('main')
    .factory('PostsService',function ($http) {


      var url = 'http://api.sunrise-sunset.org/json?lat='

      // var getPosts = function () {
      // return $http.get(url);
      // };
      var weather = {};

      var getWeather = function (geo) {
        return $http.get(url + geo.lat + '&lng=' + geo.long);
      };

      // var getSinglePost = function (id) {
      //   return $http.get(url + '/' + id);
      // };
      // var createPost = function (newPost) {
      //   $http.post(url, newPost);
      // };
      // var updatePost = function (id, poopy) {
      //   $http.put(url + '/' + id, poopy);
      // };
      // var deletePost = function (id) {
      //   $http.delete(url + '/' + id);
      // };

      return {
        getWeather: getWeather,
      };


    });
})();
