const axios = require('axios');

const pointOfInterest = 'train';
const coordinates = '-4.135470257448143,55.77419730873031';
const accessToken = 'OOPS';

const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointOfInterest}.json?type=poi&proximity=${coordinates}&access_token=${accessToken}`;

axios
	.get(api)
	.then((response) => {
		console.log('response.data', response.data);
	})
	.catch((error) => {
		console.log('error', error);
	});
