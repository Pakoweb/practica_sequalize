// services/adri17Service.js
import { sequelize } from "../config/db.js";
import adri17 from "../models/adri17.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Adri17 = adri17.init(sequelize, DataTypes);

export const crear = (data) => Adri17.create(data);
export const listar = () => Adri17.findAll();
export const obtenerPorId = (id) => Adri17.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Adri17.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Adri17.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
