// services/detalles_pedidoService.js
import { sequelize } from "../config/db.js";
import detalles_pedido from "../models/detalles_pedido.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Detalles_pedido = detalles_pedido.init(sequelize, DataTypes);

export const crear = (data) => Detalles_pedido.create(data);
export const listar = () => Detalles_pedido.findAll();
export const obtenerPorId = (id) => Detalles_pedido.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Detalles_pedido.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Detalles_pedido.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
