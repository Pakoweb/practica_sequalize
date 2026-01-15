// routes/log3Routes.js
import express from "express";
import {
  crearLog3,
  obtenerTodosLog3,
  obtenerLog3,
  actualizarLog3,
  eliminarLog3
} from "../controllers/log3Controller.js";

const router = express.Router();

router.get("/", obtenerTodosLog3);
router.get("/:id", obtenerLog3);
router.post("/", crearLog3);
router.put("/:id", actualizarLog3);
router.delete("/:id", eliminarLog3);

export default router;
