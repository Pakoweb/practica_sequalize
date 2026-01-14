// services/productosService.js
import { sequelize } from "../config/db.js";
import productos from "../models/productos.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Producto = productos.init(sequelize, DataTypes);

export const crear = (data) => Producto.create(data);
export const listar = () => Producto.findAll();
export const obtenerPorId = (id) => Producto.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Producto.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Producto.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
