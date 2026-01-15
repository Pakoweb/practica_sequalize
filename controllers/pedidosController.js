// controllers/pedidosController.js
import * as Base from "./base/pedidosBaseController.js";

export const crearPedido = Base.crearPedido;

// ✅ alias: la ruta usa obtenerPedidos, el base expone obtenerTodosPedido
export const obtenerPedidos = Base.obtenerTodosPedido;

export const obtenerPedido = Base.obtenerPedido;
export const actualizarPedido = Base.actualizarPedido;
export const eliminarPedido = Base.eliminarPedido;

