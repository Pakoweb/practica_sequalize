// controllers/logController.js
import * as Base from "./base/logBaseController.js";

export const crearLog = Base.crearLog;

// ✅ alias para que GET / (obtenerLogs) funcione con el base (obtenerTodosLog)
export const obtenerLogs = Base.obtenerTodosLog;

export const obtenerLog = Base.obtenerLog;
export const actualizarLog = Base.actualizarLog;
export const eliminarLog = Base.eliminarLog;
