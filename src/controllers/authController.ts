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
    rol: 'user',
  });

  await newUser.save();
  res.status(201).json({ message: 'Usuario creado correctamente' });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (role) {
      user.role = role;
    }

    await user.save();

    res.json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el usuario', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el usuario', error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el usuario', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los usuarios', error });
  }
};
