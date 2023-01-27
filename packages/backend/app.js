const propertyRouter = require('./routes/propertyRoutes.js');

const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(express.json());
//to remove CORS issue to frontend(development)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
// app.post('/distance', (req, res) => {
//   const start = `${req.body.startLongitude},${req.body.startLatitude};`;
//   const end = `${req.body.endLongitude},${req.body.endLatitude}`;
//   const token = `?access_token=${process.env.MAPBOX_TOKEN}`;
//   const methodOfTravel = 'driving';

//   axios
//     .get(`https://api.mapbox.com/directions/v5/mapbox/${methodOfTravel}/${start}${end}${token}`)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// app.post('/nearest', (req, res) => {
//   const pointOfInterest = req.body.pointOfInterest;
//   const coordinates = `${req.body.longitude},${req.body.latitude}`;
//   const token = `&access_token=${process.env.MAPBOX_TOKEN}`;

//   const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointOfInterest}.json?type=poi&proximity=${coordinates}${token}`;
//   axios
//     .get(api)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

app.use('/api/v1/property', propertyRouter);

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
