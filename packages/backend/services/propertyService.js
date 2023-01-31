import * as turf from '@turf/turf';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { calculateBusDuration, calculateTrainDuration } from '../utils/calculateDurations.js';
import { AND_DIGITAL_COORDINATES, METHODS_OF_TRAVEL } from '../utils/constants.js';
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
                    (property) => property.details.coordinates === feature.geometry.coordinates,
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

    for (let property of propertiesWithinPolygons) {
        calculateTravelToWork(property);
    }
    return [...new Set(propertiesWithinPolygons.flat())];
};

const getDirections = async (startCoordinates, endCoordinates, methodOfTravel) => {
    const token = process.env.MAPBOX_TOKEN;
    const { data } = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${methodOfTravel}/${startCoordinates};${endCoordinates}?access_token=${token}`,
    );
    return data.routes;
};

const getNearestPointOfInterest = async (pointOfInterest, coordinates) => {
    const resp = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pointOfInterest}.json?type=poi&proximity=${coordinates}&access_token=${token}`,
    );
    const data = [
        resp.data.features[0].properties.address,
        resp.data.features[0].context[0].text,
        resp.data.features[0].geometry.coordinates,
    ];
    return data;
};

const calculateTravelToWork = async (property) => {
    const endCoordinates = AND_DIGITAL_COORDINATES;

    const startCoordinates = [property.details.coordinates[1], property.details.coordinates[0]];

    for (const methodOfTravel of METHODS_OF_TRAVEL) {
        const distanceAndDurationData = await getDirections(
            startCoordinates,
            endCoordinates,
            methodOfTravel,
        );
        property.details[methodOfTravel] = {
            distance: distanceAndDurationData[0].distance,
            duration: distanceAndDurationData[0].duration,
        };
    }

    property.details['bus'] = calculateBusDuration(
        property.details.driving.distance,
        property.details.driving.duration,
    );
    property.details['train'] = calculateTrainDuration(
        property.details.driving.distance,
        property.details.driving.duration,
    );
};
