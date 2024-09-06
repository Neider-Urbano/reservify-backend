import { Request, Response } from 'express';
import Service from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service({
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

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error al recuperar los servicios', error });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const service = await Service.findByIdAndUpdate(
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

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el servicio', error });
  }
};
