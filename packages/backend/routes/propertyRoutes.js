import * as express from 'express';
import propertyController from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', propertyController.getPropertiesWithinPolygon);
router.get('/:id', propertyController.getPropertyById);
export default router;
