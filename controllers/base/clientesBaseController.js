// controllers/base/clientesBaseController.js
import * as Service from "../../services/clientesService.js";

// CREATE
export const crearCliente = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear cliente", error });
  }
};

// READ (todos)
export const obtenerTodosCliente = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes", error });
  }
};

// READ (uno)
export const obtenerCliente = async (req, res) => {
  try {
    const item = await Service.obtenerPorId(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

// UPDATE
export const actualizarCliente = async (req, res) => {
  try {
    const actualizado = await Service.actualizar(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar cliente", error });
  }
};

// DELETE
export const eliminarCliente = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
