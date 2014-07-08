'use strict';
angular.module('landingModule')
    .controller('landingCtrl', ['$scope', 
                                '$log',
                                'weatherService',                             
                                function($scope, $log, weatherService){

        
        $scope.kelvinToCelsius = function(kelvin){
          var kelvinCelsiusOffset = -272.15;
          var celsiusTo2Places = (Math.floor((kelvin + kelvinCelsiusOffset)*100))/100;
          return celsiusTo2Places;  
        };
        $scope.lonlat = function(lonlat){
            return Math.abs(lonlat);
        };
        $scope.title = 'Ink Global Weather';

        weatherService.getWeather(function(data){
          $scope.cities = data.list;  
        });

    }]);