(function () {
  'use strict';
  angular
    .module('main')
    .controller('MainController', function ($scope, PostsService,$rootScope, $location, $routeParams) {

        // PostsService.read().success(function (posts) {
        //   $scope.posts = posts;
        // });
        // PostsService.readOne($routeParams.id).success(function (post) {
        //   $scope.post = post;
        // });
        // $scope.deletePost = function (id) {
        //   PostsService.delete(id);
        // };
        // $scope.createPost = function (newPost) {
        //   PostsService.create(newPost);
        //   $location.path('/posts');
        // };

        $scope.getTimes = function(geo) {
          PostsService.getWeather(geo).then(function(data) {
            $rootScope.data = data.data;
            $location.path('/posts');


          })

        }

    });

})();
// $scope.getW  = funciton() {
//   PostService.getWeather(geo)then(function(data) {
//
//   })
// }
