// services/log3Service.js
import { sequelize } from "../config/db.js";
import log3 from "../models/log3.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Log3 = log3.init(sequelize, DataTypes);

export const crear = (data) => Log3.create(data);
export const listar = () => Log3.findAll();
export const obtenerPorId = (id) => Log3.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Log3.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Log3.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
