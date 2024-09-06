'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getUsers =
  exports.getUser =
  exports.deleteUser =
  exports.updateUser =
  exports.register =
  exports.login =
    void 0;
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const User_1 = __importDefault(require('../models/User'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User_1.default.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }
  const validPassword = await bcryptjs_1.default.compare(
    password,
    user.password,
  );
  if (!validPassword) {
    return res
      .status(400)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }
  const token = jsonwebtoken_1.default.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
  res.header('Authorization', `Bearer ${token}`).json({ token });
};
exports.login = login;
const register = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User_1.default.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }
  const hashedPassword = await bcryptjs_1.default.hash(password, 10);
  const newUser = new User_1.default({
    email,
    password: hashedPassword,
    rol: 'user',
  });
  await newUser.save();
  res.status(201).json({ message: 'Usuario creado correctamente' });
};
exports.register = register;
const updateUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User_1.default.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  try {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el usuario', error });
  }
};
exports.deleteUser = deleteUser;
const getUser = async (req, res) => {
  try {
    const user = await User_1.default.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el usuario', error });
  }
};
exports.getUser = getUser;
const getUsers = async (req, res) => {
  try {
    const users = await User_1.default.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los usuarios', error });
  }
};
exports.getUsers = getUsers;
