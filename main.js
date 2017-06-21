$(document).ready(function() {
  var longi;
  var lati;
  var location;
  var temperatureF;
  var temperatureC;
  var token = "F";

  var forecastF = [];
  var forecastC = [];

  // API call to get location data from the IP API
  $.ajax({
    url: "https://freegeoip.net/json/",
    async: "false",
    dataType: "json",
    success: function(data) {
      console.log("IP AJAX request successful");

      longi = data.longitude;
      lati = data.latitude;
      location = data.city;

      $("#main-location").append(location);



      // API call to get current weather conditions from Wunderground API
      $.ajax({
        url: "https://api.wunderground.com/api/7965a61d5be76ab2/conditions/q/" + lati + "," + longi + ".json",
        dataType: "json",
        success: function(response) {
          console.log("Weather conditions AJAX request successful");

          temperatureF = response.current_observation.temp_f;
          temperatureC = response.current_observation.temp_c;

          $("#main-temp").append(temperatureF + "°F");
          $("#main-weather-info").append(response.current_observation.weather);
          $("#main-weather-icon").html("<img src=\"" + response.current_observation.icon_url + "\">");
        }
      });


      // API call to get forecast data from the Wunderground API
      $.ajax({
        url: "https://api.wunderground.com/api/7965a61d5be76ab2/forecast/q/" + lati + "," + longi + ".json",
        dataType: "json",
        success: function(res) {
          console.log("Weather forecast AJAX request successful");

          var forecastArray = res.forecast.simpleforecast.forecastday;
          var counter = 0;

          $("#forecast-section").children().each(function() {
            $(this).children(".forecast-day").append(forecastArray[counter].date.weekday_short);
            $(this).children(".forecast-icon").html("<img src=\"" + forecastArray[counter].icon_url + "\">");
            $(this).children(".forecast-temp").append(forecastArray[counter].high.fahrenheit + "/" + forecastArray[counter].low.fahrenheit);
            $(this).children(".forecast-info").append(forecastArray[counter].conditions);

            forecastF.push(forecastArray[counter].high.fahrenheit + "/" + forecastArray[counter].low.fahrenheit);
            forecastC.push(forecastArray[counter].high.celsius + "/" + forecastArray[counter].low.celsius);
            counter ++;
          });
        }
      });
    }
  });



  $("#temperature-button").on("click",function(){
    if (token == "F") {
      $("#main-temp").html(temperatureC + "°C");
      $("#temperature-button").html("°F");
      token = "C";
    } else {
      $("#main-temp").html(temperatureF + "°F");
      $("#temperature-button").html("°C");
      token = "F";
    }
  });

});
