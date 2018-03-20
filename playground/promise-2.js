const request = require('request');

var geocodeAddress = (address) => {
	var encodedAddress = encodeURIComponent(address);
	return new Promise((resolve, reject) => {
	request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (error, response, body) => {
				if ( body.status === 'OK' ) {
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					});
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Unable to find the address.');
				} else if (error) {
					reject('Unable to connect to Google server.');
				}
		});
	});	
};

geocodeAddress('81 park ave worcester')
	.then((location) => {
		console.log(JSON.stringify(location, undefined, 4));
	}, (errorMessage) => {
		console.log(errorMessage);
	});