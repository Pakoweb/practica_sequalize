// routes/adri17Routes.js
import express from "express";
import {
  crearAdri17,
  obtenerTodosAdri17,
  obtenerAdri17,
  actualizarAdri17,
  eliminarAdri17
} from "../controllers/adri17Controller.js";

const router = express.Router();

router.get("/", obtenerTodosAdri17);
router.get("/:id", obtenerAdri17);
router.post("/", crearAdri17);
router.put("/:id", actualizarAdri17);
router.delete("/:id", eliminarAdri17);

export default router;
