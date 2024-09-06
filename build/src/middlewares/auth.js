'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET || 'secretkey';
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, authorization denied' });
  }
  try {
    const decoded = jsonwebtoken_1.default.verify(token, secretKey);
    // @ts-expect-error: Este error es esperado porque 'user' no existe en Request
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (roles) => {
  return (req, res, next) => {
    // @ts-expect-error: Este error es esperado porque 'user' no existe en Request
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
  };
};
exports.authorizeRole = authorizeRole;
