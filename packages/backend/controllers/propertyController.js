import { getPropertiesWithinPolygonsCoordinates } from '../services/propertyService.js';

class PropertyController {
    async getPropertiesWithinPolygon(req, res) {
        const polygonData = req.body.polygons;
        res.send(await getPropertiesWithinPolygonsCoordinates(polygonData));
    }
}
export default new PropertyController();
