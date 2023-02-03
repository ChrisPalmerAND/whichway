import axios from 'axios';
export const getPropertiesWithinPolygonsPoints = async (polygonPoints, rentValues) => {
    return await axios.post('http://localhost:8080/api/v1/property', {
        polygons: polygonPoints,
        rentValues: rentValues,
    });
};
export const getSinglePropertyDetails = async (propertyId) => {
    return await axios.get(`http://localhost:8080/api/v1/property/${propertyId}`);
};
