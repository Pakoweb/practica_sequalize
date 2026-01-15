// routes/log2Routes.js
import express from "express";
import {
  crearLog2,
  obtenerTodosLog2,
  obtenerLog2,
  actualizarLog2,
  eliminarLog2
} from "../controllers/log2Controller.js";

const router = express.Router();

router.get("/", obtenerTodosLog2);
router.get("/:id", obtenerLog2);
router.post("/", crearLog2);
router.put("/:id", actualizarLog2);
router.delete("/:id", eliminarLog2);

export default router;
