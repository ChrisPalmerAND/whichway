const allProperties = require('../utils/properties');
const turf = require('@turf/turf');

const getAllProperties = () => {
  return allProperties;
};

const getAllPropertiesCoordinate = () => {
  return getAllProperties().map((property) => property.details.coordinates);
};

const getPropertiesWithinPolygonsCoordinates = (polygonsData) => {
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

module.exports = getPropertiesWithinPolygonsCoordinates;
