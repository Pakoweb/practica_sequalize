// routes/proveedoresRoutes.js
import express from "express";
import {
  crearProveedore,
  obtenerProveedores,
  obtenerProveedore,
  actualizarProveedore,
  eliminarProveedore
} from "../controllers/proveedoresController.js";

const router = express.Router();

router.get("/", obtenerProveedores);
router.get("/:id", obtenerProveedore);
router.post("/", crearProveedore);
router.put("/:id", actualizarProveedore);
router.delete("/:id", eliminarProveedore);

export default router;
