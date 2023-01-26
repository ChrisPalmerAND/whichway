const axios = require("axios");

const pointOfInterest = "bus";
const coordinates = "-4.135470257448143,55.77419730873031";
const accessToken =
  "sk.eyJ1IjoiY3BhbG1lcmFuZCIsImEiOiJjbGRhYnMzb2kwOHV6M25ub29ieXRndHBrIn0.u2vTzVl_bYsEzK9GHH5-UA";

const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointOfInterest}.json?type=poi&proximity=${coordinates}&access_token=${accessToken}`;

axios
  .get(api)
  .then((response) => {
    console.log("response.data", response.data.features[0].geometry);
  })
  .catch((error) => {
    console.log("error", error);
  });
