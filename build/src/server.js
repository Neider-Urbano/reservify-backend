'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const helmet_1 = __importDefault(require('helmet'));
const cors_1 = __importDefault(require('cors'));
const express_rate_limit_1 = __importDefault(require('express-rate-limit'));
const express_mongo_sanitize_1 = __importDefault(
  require('express-mongo-sanitize'),
);
const reservationRoutes_1 = __importDefault(
  require('./routes/reservationRoutes'),
);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message:
    'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
});
app.use(limiter);
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.get('/', (req, res) => {
  res.send('Welcome to Reservify API');
});
app.use('/api', reservationRoutes_1.default);
exports.default = app;
