const express = require("express");
const axios = require("axios");
const app = express();

app.post("/distance", (req, res) => {
  console.log("Request recieved");
  let start = req.body.from_start + "," + req.body.from_end + ";";
  let end = req.body.to_start + "," + req.body.to_end + ";";
  let token = `&access_token=${req.body.token}`;
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
