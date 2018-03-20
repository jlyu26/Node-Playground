const request = require('request');

gecodeAddress = (addr, callback) => {
	var encodedAddress = encodeURIComponent(addr);
	const googleGeocodingKey = 'AIzaSyCZrT0gQlynV4tZvPF8uMyMTy59bBVzznE';

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleGeocodingKey}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google server.');
		} else if ( body.status === 'ZERO_RESULTS') {
			callback('Unable to find the address.');
		} else if ( body.status === 'OK' ) {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
}

module.exports = {
	gecodeAddress,
};