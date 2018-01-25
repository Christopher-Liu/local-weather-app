/* Beginning my re-write of this webapp to utilize JavaScript's Fetch API
and removing jQuery as a dependency altogether. */

let userLongitude;
let userLatitude;
let userLocation;
let temperatureF;
let temperatureC;
let token = "F";

let forecastArray = [];
let highForecastF = [];
let lowForecastF = [];
let highForecastC = [];
let lowForecastC = [];

let temperatureButton = document.querySelector("#temperature-button");
temperatureButton.addEventListener("click", () => tempUnitChange());


function populateMainSection(dataArray) {
	document.querySelector("#main-temp").innerHTML = dataArray.current_observation.temp_f + " F";
	document.querySelector("#main-weather-info").textContent = dataArray.current_observation.weather;
	document.querySelector("#main-weather-icon").innerHTML = "<img src=\"" + dataArray.current_observation.icon_url + "\">";
}


function populateForecastBar(dataArray) {
	let index = 0;
	let childrenArray = Array.from(document.querySelector('#forecast-section').children);

	childrenArray.forEach( child => {
		child.children[0].textContent = dataArray[index].date.weekday_short;   					  // .forecast-day
		child.children[1].innerHTML = "<img src=\"" + dataArray[index].icon_url + "\">";  // .forecast-icon
		child.children[2].children[0].textContent = dataArray[index].high.fahrenheit;     // .forecast-temp-high
		child.children[2].children[1].textContent = dataArray[index].low.fahrenheit;      // .forecast-temp-low
		child.children[3].textContent = dataArray[index].conditions;   							 		  // .forecast-info

		highForecastF.push(dataArray[index].high.fahrenheit);
		lowForecastF.push(dataArray[index].low.fahrenheit);
		highForecastC.push(dataArray[index].high.celsius);
		lowForecastC.push(dataArray[index].low.celsius);
		index ++;
	});
}


function tempUnitChange() {
	let count = 0;
	let forecastSection = Array.from(document.querySelector("#forecast-section").children);

	if (token === "F") {
		forecastSection.forEach(child => {
			child.children[2].children[0].textContent = highForecastC[count];
			child.children[2].children[1].textContent = lowForecastC[count];

			count ++;
		});

		document.querySelector("#main-temp").textContent = temperatureC + " C";
		document.querySelector("#temperature-button").textContent = "| F";
		token = "C"
	} else {
		forecastSection.forEach(child => {
			child.children[2].children[0].textContent = highForecastF[count];
			child.children[2].children[1].textContent = lowForecastF[count];

			count ++;
		});

		document.querySelector("#main-temp").textContent = temperatureF + " F";
		document.querySelector("#temperature-button").textContent = "| C";
		token = "F"
	}
}



fetch('https://freegeoip.net/json/')
	.then( response => response.json())
	.then( response => {
		userLongitude = response.longitude;
		userLatitude = response.latitude;

		return fetch('https://api.wunderground.com/api/7965a61d5be76ab2/conditions/q/' + userLatitude + ',' + userLongitude + '.json');
	})
	.then( response => response.json())
	.then( response => {
		temperatureF = response.current_observation.temp_f;
		temperatureC = response.current_observation.temp_c;
		userLocation = response.current_observation.display_location.city;
		document.querySelector('#main-location').textContent = userLocation;

		populateMainSection(response);

		return fetch("https://api.wunderground.com/api/7965a61d5be76ab2/forecast/q/" + userLatitude + "," + userLongitude + ".json");
	})
	.then(response => response.json())
	.then(response => {
		forecastArray = response.forecast.simpleforecast.forecastday;
		populateForecastBar(forecastArray);
	})
