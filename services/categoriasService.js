// services/categoriasService.js
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const Categoria = categorias.init(sequelize, DataTypes);

export const crear = (data) => Categoria.create(data);
export const listar = () => Categoria.findAll();
export const obtenerPorId = (id) => Categoria.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await Categoria.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await Categoria.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
