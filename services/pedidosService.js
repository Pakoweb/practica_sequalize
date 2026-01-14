// services/pedidosService.js
import { sequelize } from "../config/db.js";
import pedidos from "../models/pedidos.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Pedido = pedidos.init(sequelize, DataTypes);

export const crear = (data) => Pedido.create(data);
export const listar = () => Pedido.findAll();
export const obtenerPorId = (id) => Pedido.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Pedido.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Pedido.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
