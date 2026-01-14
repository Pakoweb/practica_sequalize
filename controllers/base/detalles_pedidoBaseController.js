// controllers/base/detalles_pedidoBaseController.js
import * as Service from "../../services/detalles_pedidoService.js";

// CREATE
export const crearDetalles_pedid = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear detalles_pedido", error });
  }
};

// READ (todos)
export const obtenerDetalles_pedido = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

// READ (uno)
export const obtenerDetalles_pedid = async (req, res) => {
  try {
    const item = await Service.obtenerPorId(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

// UPDATE
export const actualizarDetalles_pedid = async (req, res) => {
  try {
    const actualizado = await Service.actualizar(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error });
  }
};

// DELETE
export const eliminarDetalles_pedid = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Detalles_pedid eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error });
  }
};
