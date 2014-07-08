var igWeather = igWeather || {
  env: 'dev'
};

(function(options){
  if (options.env === "prod") {

    // Bedford, EN
    options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=52.1&lon=-0.4&cnt=10&callback=JSON_CALLBACK";
    // Freiburg, DE
    //options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=47.9&lon=7.8&cnt=10&callback=JSON_CALLBACK";
    // Sao Paulo, BR
    //options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=-23.5&lon=-46.6&cnt=10&callback=JSON_CALLBACK";
  }
  else {

    // Bedford, EN
    options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=52.1&lon=-0.4&cnt=10&callback=JSON_CALLBACK";
    // Freiburg, DE
    //options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=47.9&lon=7.8&cnt=10&callback=JSON_CALLBACK";
    // Sao Paulo, BR
    //options.weatherUrl = "http://api.openweathermap.org/data/2.3/find/city?lat=-23.5&lon=-46.6&cnt=10&callback=JSON_CALLBACK";
  }
})(igWeather);
