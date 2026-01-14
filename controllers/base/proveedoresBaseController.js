// controllers/base/proveedoresBaseController.js
import * as Service from "../../services/proveedoresService.js";

// CREATE
export const crearProveedore = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear proveedore", error });
  }
};

// READ (todos)
export const obtenerProveedores = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener proveedores", error });
  }
};

// READ (uno)
export const obtenerProveedore = async (req, res) => {
  try {
    const item = await Service.obtenerPorId(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener proveedore", error });
  }
};

// UPDATE
export const actualizarProveedore = async (req, res) => {
  try {
    const actualizado = await Service.actualizar(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar proveedore", error });
  }
};

// DELETE
export const eliminarProveedore = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Proveedore eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar proveedore", error });
  }
};
