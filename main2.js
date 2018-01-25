/* Beginning my re-write of this webapp to utilize JavaScript's Fetch API
and removing jQuery as a dependency altogether. */

let longi;
let lati;
let location;
let temperatureF;
let temperatureC;
let unitsToken = "F";

let highForecastF = [];
let lowForecastF = [];
let highForecastC = [];
let lowForecastC = [];


// Fetch API test code. This can replace the jQuery AJAX call
fetch('https://freegeoip.net/json/').then(res => {
	return res.json();
}).then( myJson => {
	console.log(myJson)
});
