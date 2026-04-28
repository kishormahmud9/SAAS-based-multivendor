import { Router } from 'express';
import { brandControllers } from './brand.controller';

const router = Router();

router.get('/', brandControllers.getAllBrands);

export const brandRoutes = router;
