import {
    getPropertiesWithinPolygonsCoordinates,
    getPropertyById,
} from '../services/propertyService.js';

class PropertyController {
    async getPropertiesWithinPolygon(req, res) {
        const polygonData = req.body.polygons;
        res.send(getPropertiesWithinPolygonsCoordinates(polygonData));
    }

    async getPropertyById(req, res) {
        const { id } = req.params;
        res.send(await getPropertyById(id));
    }
}
export default new PropertyController();
