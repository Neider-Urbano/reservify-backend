'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const authRoutes_1 = __importDefault(require('./authRoutes'));
const serviceRoutes_1 = __importDefault(require('./serviceRoutes'));
const reservationRoutes_1 = __importDefault(require('./reservationRoutes'));
const auth_1 = require('../middlewares/auth');
const notFound_1 = require('../middlewares/notFound');
const router = express_1.default.Router();
router.get('/', (req, res) => {
  res.send('Bienvenido a Reservify API');
});
router.use('/api', authRoutes_1.default);
router.use('/api', auth_1.authenticateToken, serviceRoutes_1.default);
router.use(
  '/api',
  auth_1.authenticateToken,
  (0, auth_1.authorizeRole)(['admin', 'user']),
  reservationRoutes_1.default,
);
router.use(notFound_1.notFound);
router.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: 'Ocurrió un error en el servidor', error: err.message });
});
exports.default = router;
