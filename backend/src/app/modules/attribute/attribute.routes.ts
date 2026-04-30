import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AttributeController } from './attribute.controller';
import { AttributeValidation } from './attribute.validation';
import requireAuth from '../../middlewares/requireAuth';
import permission from '../../middlewares/permission';

const router = express.Router();

// ── Public Routes (no auth required) ─────────────────────────────────────────
router.get('/', AttributeController.getAllAttributes);
router.get('/check-name', AttributeController.checkName);
router.get('/:id', AttributeController.getAttributeById);

// ── Admin Protected Routes ────────────────────────────────────────────────────
router.post(
  '/',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('attributes:create'),
  validateRequest(AttributeValidation.createAttributeZodSchema),
  AttributeController.createAttribute
);

router.patch(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('attributes:edit'),
  validateRequest(AttributeValidation.updateAttributeZodSchema),
  AttributeController.updateAttribute
);

router.delete(
  '/:id',
  requireAuth('ADMIN', 'SUPER_ADMIN'),
  permission('attributes:delete'),
  AttributeController.deleteAttribute
);

export const AttributeRoutes = router;
