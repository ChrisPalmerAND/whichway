import * as turf from '@turf/turf';
import * as dotenv from 'dotenv';
import { allProperties } from '../utils/properties.js';
dotenv.config();

const token = process.env.MAPBOX_TOKEN;

const getAllProperties = () => {
  return allProperties;
};

const getAllPropertiesCoordinate = () => {
  return getAllProperties().map((property) => property.details.coordinates);
};

export const getPropertiesWithinPolygonsCoordinates = (polygonsData) => {
  const points = turf.points(getAllPropertiesCoordinate());
  let propertiesWithinPolygons = [];
  polygonsData.forEach(({ coordinates, id }) => {
    //all the polygon (draw) coordinates
    const searchWithin = turf.polygon([[...coordinates]]);
    //finds all the properties within the polygon
    const propertyCoordinatesWithinPolygon = turf.pointsWithinPolygon(points, searchWithin);
    //turf give us back an array of object, we go through it and we find amongst all the properties, the ones that have the same coordinates, and we add it to the array
    if (propertyCoordinatesWithinPolygon.features.length) {
      propertyCoordinatesWithinPolygon.features.forEach((feature) => {
        let property = getAllProperties().find(
          (property) => property.details.coordinates === feature.geometry.coordinates
        );
        if (property) {
          propertiesWithinPolygons.push({
            ...property,
            leafletId: id,
          });
        }
      });
    }
  });
  return [...new Set(propertiesWithinPolygons.flat())];
};

const getDistance = async (startCoordinates, endCoordinates, methodOfTravel) => {
  const token = `?access_token=${process.env.MAPBOX_TOKEN}`;

  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/${methodOfTravel}/${startCoordinates}${endCoordinates}?access_token=${token}`
  );

  data.routes.forEach((route) => {
    route.durationByTrain = calculateTrainDuration(route.distance, route.duration);
    route.durationByBus = calculateBusDuration(route.distance, route.duration);
  });
  return data;
};

//TOTO what does this???
const getNearestWhat = async (pointOfInterest, coordinates) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointOfInterest}.json?type=poi&proximity=${coordinates}&access_token=${token}`;
  const resp = await axios.get(url);
  return resp.data;
};
