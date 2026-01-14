// services/proveedoresService.js
import { sequelize } from "../config/db.js";
import proveedores from "../models/proveedores.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Proveedore = proveedores.init(sequelize, DataTypes);

export const crear = (data) => Proveedore.create(data);
export const listar = () => Proveedore.findAll();
export const obtenerPorId = (id) => Proveedore.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Proveedore.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Proveedore.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
