'use strict';

var igWeather = igWeather || {
  env: 'dev'
};

angular.module('sharedModule')
	.factory('weatherService', [
    '$http',
		function($http){
			var srv = {
          getWeather: function(callback){

            return $http({method: 'JSONP', url: igWeather.weatherUrl})
              .success(function(data){
                callback(data);
              })
              .error(function(){
                callback({error: 'Error: GetWeather didnt return results'});   
              });
              
          }
			};
			return srv;
		}
	]); 