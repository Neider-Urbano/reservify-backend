import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );

  res.header('Authorization', `Bearer ${token}`).json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: 'Usuario creado correctamente' });
};
