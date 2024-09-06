'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteService =
  exports.updateService =
  exports.getServices =
  exports.createService =
    void 0;
const Service_1 = __importDefault(require('../models/Service'));
const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service_1.default({
      name,
      description,
      price,
    });
    await service.save();
    res.status(201).json({ message: 'Servicio creado', service });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el servicio', error });
  }
};
exports.createService = createService;
const getServices = async (req, res) => {
  try {
    const services = await Service_1.default.find();
    res.json(services);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error al recuperar los servicios', error });
  }
};
exports.getServices = getServices;
const updateService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = await Service_1.default.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true },
    );
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio actualizado', service });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el servicio', error });
  }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
  try {
    const service = await Service_1.default.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el servicio', error });
  }
};
exports.deleteService = deleteService;
