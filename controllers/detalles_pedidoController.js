// controllers/detalles_pedidoController.js
import * as Base from "./base/detalles_pedidoBaseController.js";

export const crearDetalles_pedido = Base.crearDetalles_pedido;
export const obtenerDetalles_pedido = Base.obtenerTodosDetalles_pedido; // alias para listar
export const obtenerDetalle_pedido = Base.obtenerDetalles_pedido;       // alias para uno
export const actualizarDetalles_pedido = Base.actualizarDetalles_pedido;
export const eliminarDetalles_pedido = Base.eliminarDetalles_pedido;
