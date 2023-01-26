const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();

dotenv.config();
app.use(express.json());

app.post("/distance", (req, res) => {
  const start = `${req.body.startLongitude},${req.body.startLatitude};`;
  const end = `${req.body.endLongitude},${req.body.endLatitude}`;
  const token = `?access_token=${process.env.MAPBOX_TOKEN}`;

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

app.listen(3001, () => console.log("Listening on port 3001!"));
