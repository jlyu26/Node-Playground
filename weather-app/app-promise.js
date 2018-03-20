// polish weather app with Axios

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		address: {
			demand: true,
			alias: 'a',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

const googleGeocodingKey = 'AIzaSyCZrT0gQlynV4tZvPF8uMyMTy59bBVzznE';
const weatherApiKey = '793316c1d224c58bc97d93dab506ece3';

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleGeocodingKey}`;

axios.get(geocodeUrl)
	.then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find the address.');
		}
		var { lat, lng } = response.data.results[0].geometry.location;
		var weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl)
	})
	.then((response) => {
		var { temperature, apparentTemperature } = response.data.currently;
		console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
	})
	.catch((error) => {
		if (error.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers.');
		} else {
			console.log(error.message);
		}
	});
