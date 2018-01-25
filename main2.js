/* Beginning my re-write of this webapp to utilize JavaScript's Fetch API
and removing jQuery as a dependency altogether. */

let userLongitude;
let userLatitude;
let userLocation;
let temperatureF;
let temperatureC;
let unitsToken = "F";

let forecastArray = [];
let highForecastF = [];
let lowForecastF = [];
let highForecastC = [];
let lowForecastC = [];

function populateForecastBar(dataArray) {
	let index = 0;
	let childrenArray = Array.from(document.querySelector('#forecast-section').children);

	childrenArray.forEach( child => {
		child.children[0].textContent = dataArray[index].date.weekday_short;   					// .forecast-day
		child.children[1].innerHTML = "<img src=\"" + dataArray[index].icon_url + "\">";  // .forecast-icon
		child.children[2].children[0].textContent = dataArray[index].high.fahrenheit;    // .forecast-temp-high
		child.children[2].children[1].textContent = dataArray[index].low.fahrenheit;     // .forecast-temp-low
		child.children[3].textContent = dataArray[index].conditions;   							 		// .forecast-info

		highForecastF.push(dataArray[index].high.fahrenheit);
		lowForecastF.push(dataArray[index].low.fahrenheit);
		highForecastC.push(dataArray[index].high.celsius);
		lowForecastC.push(dataArray[index].low.celsius);
		index ++;
	});
};


fetch('https://freegeoip.net/json/')
	.then( response => response.json())
	.then( response => {
		console.log('Fetch call for geolocation data successful');
		userLongitude = response.longitude;
		userLatitude = response.latitude;
		userLocation = response.location;

		document.querySelector('#main-location').textContent = userLocation;

		return fetch('https://api.wunderground.com/api/7965a61d5be76ab2/conditions/q/' + userLatitude + ',' + userLongitude + '.json');
	})
	.then( response => response.json())
	.then( response => {
		console.log('Fetch call for temperature conditions data successful');
		temperatureF = response.current_observation.temp_f;
		temperatureC = response.current_observation.temp_c;

		return fetch("https://api.wunderground.com/api/7965a61d5be76ab2/forecast/q/" + userLatitude + "," + userLongitude + ".json");
	})
	.then(response => response.json())
	.then(response => {
		console.log('Fetch call for forecast data successful');

		forecastArray = response.forecast.simpleforecast.forecastday;
		populateForecastBar(forecastArray);
	})
