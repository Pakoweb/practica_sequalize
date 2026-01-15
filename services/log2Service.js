// services/log2Service.js
import { sequelize } from "../config/db.js";
import log2 from "../models/log2.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Log2 = log2.init(sequelize, DataTypes);

export const crear = (data) => Log2.create(data);
export const listar = () => Log2.findAll();
export const obtenerPorId = (id) => Log2.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Log2.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Log2.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
