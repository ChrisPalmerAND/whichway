import * as express from 'express';
import propertyController from '../controllers/propertyController.js';

const router = express.Router();

router.get('/', propertyController.getPropertiesWithinPolygon);
export default router;
