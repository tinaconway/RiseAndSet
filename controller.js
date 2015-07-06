

(function () {
  'use strict';
  angular
    .module('main')
    .controller('MainController', function ($scope, PostsService, $rootScope, $location, $routeParams) {
        $scope.getCurrentLocation = function() {
          navigator.geolocation.getCurrentPosition(function(position) {
            getCoords(position.coords.latitude, position.coords.longitude);
          });
          var getCoords = function(x, y) {
            var lat = x;
            var long = y;
            PostsService.getWeather(lat, long).then(function(data) {
              $rootScope.sunrise = data.data.results.sunrise;
              $rootScope.sunset = data.data.results.sunset;
              console.log($rootScope.sunset);
              //SUNSET
              var sunset = new Date($rootScope.sunset);
              var milliSet = sunset.getTime() + (sunset.getTimezoneOffset() * 60000)
              var offsetSet = new Date().getTimezoneOffset() * 60000
              var differenceSet = milliSet - offsetSet;
              var localDateSet = new Date(differenceSet)
              var hourSet = localDateSet.getHours();
              var minSet = localDateSet.getMinutes();
              var secSet = localDateSet.getSeconds();
              var myMilTimeSet = hourSet+':'+minSet+':'+secSet
              //sunrise
              var sunrise = new Date($rootScope.sunrise);
              var milliRise = sunrise.getTime() + (sunrise.getTimezoneOffset() * 60000)
              var offsetRise = new Date().getTimezoneOffset() * 60000
              var differenceRise = milliRise - offsetRise;
              var localDateRise = new Date(differenceRise)
              var hourRise = localDateRise.getHours();
              var minRise = localDateRise.getMinutes();
              var secRise = localDateRise.getSeconds();
              var myMilTimeRise = hourRise+':'+minRise + ' AM'
              function milToStandard(value) {
              if (value !== null && value !== undefined){ //If value is passed in
                if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
                  return value;
                }
                else {
                  if(value.length == 8){ //If value is the expected length for military time then process to standard time.
                    var hour = value.substring ( 0,2 ); //Extract hour
                    var minutes = value.substring ( 3,5 ); //Extract minutes
                    var identifier = 'AM'; //Initialize AM PM identifier
                    if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
                      identifier = 'PM';
                    }
                    if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
                      hour=12;
                    }
                    if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                      hour = hour - 12;
                      identifier='PM';
                    }
                    return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
                  }
                  else { //If value is not the expected length than just return the value as is
                    return value;
                  }
                }
              }
            };
            var myStandardTimeSet = milToStandard(myMilTimeSet);
            $rootScope.sunset = myStandardTimeSet
            var myStandardTimeRise = milToStandard(myMilTimeRise);
            $rootScope.sunrise = myStandardTimeRise
              $location.path('/posts');
            })
          }
        }


        $scope.getTimes = function(address) {
          $scope.postData(address);
          this.address = "";

          }
          $scope.postData = function(address){
                    var addressString = address;
                    var geocoder = new google.maps.Geocoder();

                    geocoder.geocode( { 'address': addressString}, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                          PostsService.getWeather(latitude, longitude).success(function(data){
                          console.log(data);
                            $rootScope.sunrise = data.results.sunrise;
                            $rootScope.sunset = data.results.sunset;
                            console.log($rootScope.sunset);
                            //SUNSET
                            var sunset = new Date($rootScope.sunset);
                            var milliSet = sunset.getTime() + (sunset.getTimezoneOffset() * 60000)
                            var offsetSet = new Date().getTimezoneOffset() * 60000
                            var differenceSet = milliSet - offsetSet;
                            var localDateSet = new Date(differenceSet)
                            var hourSet = localDateSet.getHours();
                            var minSet = localDateSet.getMinutes();
                            var secSet = localDateSet.getSeconds();
                            var myMilTimeSet = hourSet+':'+minSet+':'+secSet
                            //sunrise
                            var sunrise = new Date($rootScope.sunrise);
                            var milliRise = sunrise.getTime() + (sunrise.getTimezoneOffset() * 60000)
                            var offsetRise = new Date().getTimezoneOffset() * 60000
                            var differenceRise = milliRise - offsetRise;
                            var localDateRise = new Date(differenceRise)
                            var hourRise = localDateRise.getHours();
                            var minRise = localDateRise.getMinutes();
                            var secRise = localDateRise.getSeconds();
                            var myMilTimeRise = hourRise+':'+minRise + ' AM'
                            function milToStandard(value) {
                            if (value !== null && value !== undefined){ //If value is passed in
                              if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
                                return value;
                              }
                              else {
                                if(value.length == 8){ //If value is the expected length for military time then process to standard time.
                                  var hour = value.substring ( 0,2 ); //Extract hour
                                  var minutes = value.substring ( 3,5 ); //Extract minutes
                                  var identifier = 'AM'; //Initialize AM PM identifier
                                  if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
                                    identifier = 'PM';
                                  }
                                  if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
                                    hour=12;
                                  }
                                  if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                                    hour = hour - 12;
                                    identifier='PM';
                                  }
                                  return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
                                }
                                else { //If value is not the expected length than just return the value as is
                                  return value;
                                }
                              }
                            }
                          };
                          var myStandardTimeSet = milToStandard(myMilTimeSet);
                          $rootScope.sunset = myStandardTimeSet
                          var myStandardTimeRise = milToStandard(myMilTimeRise);
                          $rootScope.sunrise = myStandardTimeRise
                            $location.path('/posts');
                          })

                        }

                        });
                      }
                    });

        })();
