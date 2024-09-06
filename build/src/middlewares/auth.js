'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
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
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
exports.authenticateToken = authenticateToken;
