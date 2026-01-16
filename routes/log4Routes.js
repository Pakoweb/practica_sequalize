// routes/log4Routes.js
import express from "express";
import {
  crearLog4,
  obtenerTodosLog4,
  obtenerLog4,
  actualizarLog4,
  eliminarLog4
} from "../controllers/log4Controller.js";

const router = express.Router();

router.get("/", obtenerTodosLog4);
router.get("/:id", obtenerLog4);
router.post("/", crearLog4);
router.put("/:id", actualizarLog4);
router.delete("/:id", eliminarLog4);

export default router;
