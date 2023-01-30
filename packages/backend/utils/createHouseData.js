import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
const milesRadius = 3;
import { writeFile } from "fs";

const path = "./utils/houseData.json";

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
let workCoordinates;
let rent;
let miles;
let nearestTrainStation;
let nearestBusStop;

const cleanCoordinates = (coordinates) => {
  return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
};

const mileRadiusCollection = [1, 3, 5, 10, 15];
let houseCollection = [];

for (let i = 0; i < mileRadiusCollection.length; i++) {
  for (let j = 0; j < 20; j++) {
    let house = {};
    house["id"] = uuidv4();
    miles = mileRadiusCollection[j];
    workCoordinates = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(
        [55.861331, -4.250493],
        milesRadius,
        false
      )
    );
    rent = parseFloat(faker.finance.amount(400, 1500));
    nearestTrainStation = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(workCoordinates, 2, false)
    );
    nearestBusStop = cleanCoordinates(
      faker.address.nearbyGPSCoordinate(workCoordinates, 1, false)
    );

    house["details"] = {
      milesFromWork: null,
      workCoordinates: workCoordinates,
      rent: rent,
      timeToDrive: null,
      timeToCycle: null,
      timeToWalk: null,
      nearestTrainStation: null,
      nearestBusStop: null,
      averageRent: null,
    };
    houseCollection.push(house);
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
