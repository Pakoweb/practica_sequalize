// services/clientesService.js
import { sequelize } from "../config/db.js";
import clientes from "../models/clientes.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Cliente = clientes.init(sequelize, DataTypes);

export const crear = (data) => Cliente.create(data);
export const listar = () => Cliente.findAll();
export const obtenerPorId = (id) => Cliente.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Cliente.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Cliente.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
