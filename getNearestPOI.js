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

app.get("/distance", (req, res) => {
  const start = req.start;
  const end = "";
  console.log("Request received");
  axios
    .get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start},${end};` +
        req.params.from_start +
        "," +
        req.params.from_end +
        ";" +
        req.params.to_start +
        "," +
        req.params.to_end +
        ";" +
        "?annotations=" +
        process.env.MAPBOX_ANNOTATIONS +
        "&overview=" +
        +process.env.MAPBOX_OVERVIEW +
        "&geometries=" +
        process.env.MAPBOX_GEOMETRY +
        "&access_token=" +
        process.env.MAPBOX_ACCESS_TOKEN
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});
