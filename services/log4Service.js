// services/log4Service.js
import { sequelize } from "../config/db.js";
import log4 from "../models/log4.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Log4 = log4.init(sequelize, DataTypes);

export const crear = (data) => Log4.create(data);
export const listar = () => Log4.findAll();
export const obtenerPorId = (id) => Log4.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Log4.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Log4.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
