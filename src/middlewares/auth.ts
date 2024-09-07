import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'secretkey';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // @ts-expect-error: Este error es esperado porque 'user' no existe en Request
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
