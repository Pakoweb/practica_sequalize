// autocrud.js
import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersPath = "./controllers";
const controllersBasePath = "./controllers/base";
const servicesPath = "./services";
const routesPath = "./routes";

fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });


// Filtramos solo los modelos (sin incluir init-models.js)
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: productos
  const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
  const singular = modelName.replace(/s$/, ""); // producto, cliente, pedido, etc.
  
  // ---------- SERVICE ----------
  const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const ${modelClass.slice(0, -1)} = ${modelName}.init(sequelize, DataTypes);

export const crear = (data) => ${modelClass.slice(0, -1)}.create(data);
export const listar = () => ${modelClass.slice(0, -1)}.findAll();
export const obtenerPorId = (id) => ${modelClass.slice(0, -1)}.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await ${modelClass.slice(0, -1)}.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await ${modelClass.slice(0, -1)}.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
`;
  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);


    // ---------- CONTROLADOR BASE ----------
  const baseControllerContent = `// controllers/base/${modelName}BaseController.js
import * as Service from "../../services/${modelName}Service.js";

// CREATE
export const crear${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
};

// READ (todos)
export const obtener${modelClass} = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
};

// READ (uno)
export const obtener${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const item = await Service.obtenerPorId(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
  }
};

// UPDATE
export const actualizar${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const actualizado = await Service.actualizar(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
};

// DELETE
export const eliminar${modelClass.slice(0, -1)} = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${modelClass.slice(0, -1)} eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;
  fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, baseControllerContent);



  // ---------- CONTROLADOR ----------
  const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";


export const crear${modelClass.slice(0, -1)} = Base.crear${modelClass.slice(0, -1)};
export const obtener${modelClass} = Base.obtener${modelClass};
export const obtener${modelClass.slice(0, -1)} = Base.obtener${modelClass.slice(0, -1)};
export const actualizar${modelClass.slice(0, -1)} = Base.actualizar${modelClass.slice(0, -1)};
export const eliminar${modelClass.slice(0, -1)} = Base.eliminar${modelClass.slice(0, -1)};


`;
 fs.writeFileSync(`${controllersPath}/${modelName}Controller.js`, controllerContent);

  // ---------- RUTA ----------
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  crear${modelClass.slice(0, -1)},
  obtener${modelClass},
  obtener${modelClass.slice(0, -1)},
  actualizar${modelClass.slice(0, -1)},
  eliminar${modelClass.slice(0, -1)}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${modelClass});
router.get("/:id", obtener${modelClass.slice(0, -1)});
router.post("/", crear${modelClass.slice(0, -1)});
router.put("/:id", actualizar${modelClass.slice(0, -1)});
router.delete("/:id", eliminar${modelClass.slice(0, -1)});

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
  console.log(`✅ CRUD generado para: ${modelName}`);
}

console.log("🎉 Todos los controladores y rutas han sido generados correctamente.");