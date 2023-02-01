import axios from 'axios';
export const getPropertiesWithinPolygonsPoints = async (polygonPoints) => {
    return await axios.post('http://localhost:8080/api/v1/property', {
        polygons: polygonPoints,
    });
};
export const getSinglePropertyDetails = async (propertyId) => {
    return await axios.get(`http://localhost:8080/api/v1/property/${propertyId}`);
};
