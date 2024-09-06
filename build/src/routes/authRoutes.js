'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const authController_1 = require('../controllers/authController');
const auth_1 = require('../middlewares/auth');
const notFound_1 = require('../middlewares/notFound');
const router = express_1.default.Router();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get(
  '/users',
  auth_1.authenticateToken,
  (0, auth_1.authorizeRole)(['admin']),
  authController_1.getUsers,
);
router.get(
  '/users/:id',
  auth_1.authenticateToken,
  (0, auth_1.authorizeRole)(['admin', 'user']),
  authController_1.getUser,
);
router.put(
  '/users/:id',
  auth_1.authenticateToken,
  (0, auth_1.authorizeRole)(['admin', 'user']),
  authController_1.updateUser,
);
router.delete(
  '/users/:id',
  auth_1.authenticateToken,
  (0, auth_1.authorizeRole)(['admin']),
  authController_1.deleteUser,
);
router.use(notFound_1.notFound);
exports.default = router;
