'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const serviceController_1 = require('../controllers/serviceController');
const auth_1 = require('../middlewares/auth');
const notFound_1 = require('../middlewares/notFound');
const router = express_1.default.Router();
router.post(
  '/services',
  (0, auth_1.authorizeRole)(['admin']),
  serviceController_1.createService,
);
router.get(
  '/services',
  (0, auth_1.authorizeRole)(['admin', 'user']),
  serviceController_1.getServices,
);
router.put(
  '/services/:id',
  (0, auth_1.authorizeRole)(['admin']),
  serviceController_1.updateService,
);
router.delete(
  '/services/:id',
  (0, auth_1.authorizeRole)(['admin']),
  serviceController_1.deleteService,
);
router.use(notFound_1.notFound);
exports.default = router;
