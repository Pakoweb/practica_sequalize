// controllers/base/pedidosBaseController.js
import * as Service from "../../services/pedidosService.js";

// CREATE
export const crearPedido = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear pedido", error });
  }
};

// READ (todos)
export const obtenerPedidos = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};

// READ (uno)
export const obtenerPedido = async (req, res) => {
  try {
    const item = await Service.obtenerPorId(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedido", error });
  }
};

// UPDATE
export const actualizarPedido = async (req, res) => {
  try {
    const actualizado = await Service.actualizar(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar pedido", error });
  }
};

// DELETE
export const eliminarPedido = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar pedido", error });
  }
};
