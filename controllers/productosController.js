// controllers/productosController.js
import * as Base from "./base/productosBaseController.js";

export const crearProducto = Base.crearProducto;

// ✅ alias: la ruta usa obtenerProductos, el base expone obtenerTodosProducto
export const obtenerProductos = Base.obtenerTodosProducto;

export const obtenerProducto = Base.obtenerProducto;
export const actualizarProducto = Base.actualizarProducto;
export const eliminarProducto = Base.eliminarProducto;
