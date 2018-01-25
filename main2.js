/* Beginning my re-write of this webapp to utilize JavaScript's Fetch API
and removing jQuery as a dependency altogether. */

let userLongitude;
let userLatitude;
let userLocation;
let temperatureF;
let temperatureC;
let unitsToken = "F";

let highForecastF = [];
let lowForecastF = [];
let highForecastC = [];
let lowForecastC = [];


// Fetch API test code. This can replace the jQuery AJAX call
fetch('https://freegeoip.net/json/')
	.then( response => response.json())
	.then( response => {
		userLongitude = response.longitude;
		userLatitude = response.latitude;
		userLocation = response.location;

		document.querySelector('#main-location').textContent = userLocation;

		return fetch('https://api.wunderground.com/api/7965a61d5be76ab2/conditions/q/' + userLatitude + ',' + userLongitude + '.json');
	})
	.then( response => response.json())
	.then( response => {
		temperatureF = response.current_observation.temp_f;
		temperatureC = response.current_observation.temp_c;

		return fetch("https://api.wunderground.com/api/7965a61d5be76ab2/forecast/q/" + userLatitude + "," + userLongitude + ".json"),
	})
