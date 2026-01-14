// services/logService.js
import { sequelize } from "../config/db.js";
import log from "../models/log.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Lo = log.init(sequelize, DataTypes);

export const crear = (data) => Lo.create(data);
export const listar = () => Lo.findAll();
export const obtenerPorId = (id) => Lo.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Lo.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Lo.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
