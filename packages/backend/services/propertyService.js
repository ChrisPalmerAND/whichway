import * as turf from '@turf/turf';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { calculateBusDuration, calculateTrainDuration } from '../utils/calculateDurations.js';
import {
    AND_DIGITAL_COORDINATES,
    METHODS_OF_TRAVEL,
    POINTS_OF_INTEREST,
} from '../utils/constants.js';
import { allProperties } from '../utils/properties.js';
import transformDistance from '../utils/transformDistance.js';
import transformTime from '../utils/transformTime.js';
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

    return [...new Set(propertiesWithinPolygons.flat())];
};

export const getPropertyById = async (id) => {
    const property = getAllProperties().find((property) => property.id === id);

    await calculateTravelToWork(property);
    await calculateNearestPublicTransport(property);
    return property;
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

    const context = resp.data.features[0].context;
    const findPostcode = (context) => {
        let postcode;
        context.forEach((object) => {
            if (object.id.match('postcode')) {
                postcode = object.text;
            }
        });
        return postcode;
    };
    const postcode = findPostcode(context);

    const data = {
        address: resp.data.features[0].properties.address,
        postcode,
        coordinates: resp.data.features[0].geometry.coordinates,
    };
    return data;
};

const calculateTravelToWork = async (property) => {
    const endCoordinates = AND_DIGITAL_COORDINATES;

    const startCoordinates = [property.details.coordinates[1], property.details.coordinates[0]];
    let drivingDurationUnformatted;
    let drivingDistanceUnformatted;

    for (const methodOfTravel of METHODS_OF_TRAVEL) {
        const distanceAndDurationData = await getDirections(
            startCoordinates,
            endCoordinates,
            methodOfTravel,
        );

        if (methodOfTravel === 'driving') {
            drivingDurationUnformatted = distanceAndDurationData[0].duration;
            drivingDistanceUnformatted = distanceAndDurationData[0].distance;
        }

        property.details[methodOfTravel] = {
            distance: transformDistance(distanceAndDurationData[0].distance),
            duration: transformTime(distanceAndDurationData[0].duration),
        };
    }

    property.details['bus'] = calculateBusDuration(
        drivingDistanceUnformatted,
        drivingDurationUnformatted,
    );
    property.details['train'] = calculateTrainDuration(
        drivingDistanceUnformatted,
        drivingDurationUnformatted,
    );
};

const calculateNearestPublicTransport = async (property) => {
    for (const pointOfInterest of POINTS_OF_INTEREST) {
        const publicTransportAttribute =
            pointOfInterest === 'train' ? 'nearestTrainStation' : 'nearestBusStop';
        const coordinates = [property.details.coordinates[1], property.details.coordinates[0]];
        const poiDataSet = await getNearestPointOfInterest(pointOfInterest, coordinates);
        property.details[publicTransportAttribute] = poiDataSet;
    }
};
