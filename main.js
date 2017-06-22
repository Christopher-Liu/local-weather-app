$(document).ready(function() {
  var longi;
  var lati;
  var location;
  var temperatureF;
  var temperatureC;
  var token = "F";

  var highForecastF = [];
  var lowForecastF = [];
  var highForecastC = [];
  var lowForecastC = [];


  // API request-chain to get all of the weather data
  // Starts with an API get-request to get location data from the IP API
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

          $("#main-temp").html(temperatureF + " F");
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
            $(this).find(".forecast-temp-high").append(forecastArray[counter].high.fahrenheit);
            $(this).find(".forecast-temp-low").append(forecastArray[counter].low.fahrenheit);
            $(this).children(".forecast-info").append(forecastArray[counter].conditions);

            highForecastF.push(forecastArray[counter].high.fahrenheit);
            lowForecastF.push(forecastArray[counter].low.fahrenheit);
            highForecastC.push(forecastArray[counter].high.celsius);
            lowForecastC.push(forecastArray[counter].low.celsius);
            counter ++;
          });
        }
      });
    }
  });



  $("#temperature-button").on("click", function(){
    tempUnitChange();
  });



  // Function for switching temperature units from F to C and vice versa
  function tempUnitChange(){
    var count = 0;

    if (token == "F") {
      $("#forecast-section").children().each(function() {
        $(this).find(".forecast-temp-high").html(highForecastC[count]);
        $(this).find(".forecast-temp-low").html(lowForecastC[count]);
        $("#main-temp").html(temperatureC + " C");
        $("#temperature-button").html("| F");
        count ++;
      });
      token = "C";
    } else {
      $("#forecast-section").children().each(function() {
        $(this).find(".forecast-temp-high").html(highForecastF[count]);
        $(this).find(".forecast-temp-low").html(lowForecastF[count]);
        $("#main-temp").html(temperatureF + " F");
        $("#temperature-button").html("| C");
        count ++;
      });
      token = "F";
    }
  };


});
