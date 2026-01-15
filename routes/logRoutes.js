// routes/logRoutes.js
import express from "express";
import {
  crearLog,
  obtenerLogs,
  obtenerLog,
  actualizarLog,
  eliminarLog
} from "../controllers/logController.js";

const router = express.Router();

// LISTAR TODOS
router.get("/", obtenerLogs);

// OBTENER UNO
router.get("/:id", obtenerLog);

// CRUD
router.post("/", crearLog);
router.put("/:id", actualizarLog);
router.delete("/:id", eliminarLog);

export default router;
