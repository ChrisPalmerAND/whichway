const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json);

app.post("/distance", (req, res) => {
  const start = `${req.body.startLongitude},${req.body.startLatitude};`;
  const end = `${req.body.endLongitude},${req.body.endLatitude}`;
  const token = `?access_token=${req.body.access_token}`;

  axios
    .get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start}${end}${token}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(3000, () => console.log("Listening on port 3000!"));
