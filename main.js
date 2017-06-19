$(document).ready(function() {

  var ipAPI = "https://freegeoip.net/json/";
  var longi;
  var lati;
  var location;
  var weatherInfo;
  var weatherIcon;
  var temperatureF;
  var temperatureC;
  var token = "F";

  // API call to get location data from the IP API
  $.ajax({
    url: ipAPI,
    async: false,
    dataType: "json",
    success: function(data) {
      longi = data.longitude;
      lati = data.latitude;
  }});

  $.ajax({
    url: ("https://api.wunderground.com/api/7965a61d5be76ab2/conditions/q/" + lati + "," + longi + ".json"),
    async: false,
    dataType: "json",
    success: function(response) {
      location = response.current_observation.display_location.city;
      temperatureF = response.current_observation.temp_f;
      temperatureC = response.current_observation.temp_c;
      weatherInfo = response.current_observation.weather;
      weatherIcon = response.current_observation.icon_url;
      $(".location").append(location);
      $(".weather-info").append(weatherInfo);
      $(".temperature-info").append(temperatureF +"°F");
      $("#weather-icon").html("<img src=\"" + weatherIcon + "\">");
    }
  });




  $(".temperature-button").on("click",function(){
    if (token == "F") {
      $(".temperature-info").html(temperatureC + "°C");
      $(".temperature-button").html("°F");
      token = "C";
    } else {
      $(".temperature-info").html(temperatureF + "°F");
      $(".temperature-button").html("°C");
      token = "F";
    }
  });

});
