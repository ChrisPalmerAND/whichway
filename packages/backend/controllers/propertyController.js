const getPropertiesWithinPolygonsCoordinates = require('../services/propertyService');

class PropertyController {
  async getPropertiesWithinPolygon(req, res) {
    const polygonData = req.body.polygons;
    res.send(getPropertiesWithinPolygonsCoordinates(polygonData));
  }
}
module.exports = new PropertyController();
