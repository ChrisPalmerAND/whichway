const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const milesRadius = 3;
const { writeFile } = require("fs");

const path = "./houseData.json";

/*
Return object
const house = {
    _id: uuid;
    details: {
        coordinates: array of latitude and longitude,
        averageRent: integer,
        timeToCycle: seconds,
        timeToDrive: seconds,
        timeToWalk: seconds,
        nearestTrainStaion: array of latitude and longitude,
        nearestBusStop: array of latitude and longitude,
    }
}
*/

let id;
let coordinatesOfTheHouse;
let averageRent;
let timeToDrive;
let timeToCycle;
let timeToWalk;
let nearestTrainStation;
let nearestBusStop;

const cleanCoordinates = (coordinates) => {
  return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
};

const mileRadiusCollection = [1, 3, 5, 10, 15];
let houseCollection = {};

for (let i = 0; i < mileRadiusCollection.length; i++) {
  for (let j = 0; j < 5; j++) {
    let house = {};
    id = uuidv4();
    miles = mileRadiusCollection[j];
    coordinatesOfTheHouse = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(
        [55.861331, -4.250493],
        milesRadius,
        false
      )
    );
    rent = parseFloat(faker.finance.amount(400, 1000));
    timeToDrive = Math.floor(Math.random() * 10000 + 1);
    timeToCycle = Math.floor(Math.random() * 15000 + 1);
    timeToWalk = Math.floor(Math.random() * 20000 + 1);
    nearestTrainStation = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(coordinatesOfTheHouse, 2, false)
    );
    nearestBusStop = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(coordinatesOfTheHouse, 1, false)
    );

    house["details"] = {
      milesFromWork: null,
      coordinates: coordinatesOfTheHouse,
      rent: rent,
      timeToDrive: null,
      timeToCycle: null,
      timeToWalk: null,
      nearestTrainStation: null,
      nearestBusStop: null,
    };
    houseCollection[id] = house;
  }
}
console.log(houseCollection);

writeFile(path, JSON.stringify(houseCollection, null, 2), (error) => {
  if (error) {
    console.log("An error has occurred ", error);
    return;
  }
  console.log("Data written successfully to disk");
});
