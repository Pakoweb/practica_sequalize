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

// Crea archivos SOLO si no existen (para no perder personalizaciones)
const writeIfNotExists = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`Se mantiene (no se sobrescribe): ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(` Creado: ${filePath}`);
};

// Filtra modelos
const models = fs
  .readdirSync(modelsPath)
  .filter((f) => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: productos, log2, detalles_pedido
  const singular = modelName.replace(/s$/, "");      // si acaba en s, quita s; si no, se queda igual
  const singularClass = singular.charAt(0).toUpperCase() + singular.slice(1);

  // Nombres de handlers (evita colisiones cuando singular === plural)
  const listHandler = `obtenerTodos${singularClass}`;   // listar SIEMPRE así (robusto)
  const getOneHandler = `obtener${singularClass}`;
  const createHandler = `crear${singularClass}`;
  const updateHandler = `actualizar${singularClass}`;
  const deleteHandler = `eliminar${singularClass}`;

  // ---------- SERVICE ----------
  // Se sobrescribe siempre (genérico)
  const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

// Inicializamos el modelo con la conexión activa
const ${singularClass} = ${modelName}.init(sequelize, DataTypes);

export const crear = (data) => ${singularClass}.create(data);
export const listar = () => ${singularClass}.findAll();
export const obtenerPorId = (id) => ${singularClass}.findByPk(id);

export const actualizar = async (id, data) => {
  const item = await ${singularClass}.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

export const eliminar = async (id) => {
  const item = await ${singularClass}.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return true;
};
`;
  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

  // ---------- BASE CONTROLLER ----------
  // Se sobrescribe siempre (esto es lo regenerable)
  const baseControllerContent = `// controllers/base/${modelName}BaseController.js
import * as Service from "../../services/${modelName}Service.js";

// CREATE
export const ${createHandler} = async (req, res) => {
  try {
    const nuevo = await Service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
};

// READ (todos)
export const ${listHandler} = async (req, res) => {
  try {
    const lista = await Service.listar();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
};

// READ (uno)
export const ${getOneHandler} = async (req, res) => {
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
export const ${updateHandler} = async (req, res) => {
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
export const ${deleteHandler} = async (req, res) => {
  try {
    const ok = await Service.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${singular} eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;
  fs.writeFileSync(
    `${controllersBasePath}/${modelName}BaseController.js`,
    baseControllerContent
  );

  // ---------- EXTENDED CONTROLLER ----------
  // NO se sobrescribe 
  const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

// Personaliza aquí si quieres (este archivo NO se sobrescribe)
export const ${createHandler} = Base.${createHandler};
export const ${listHandler} = Base.${listHandler};
export const ${getOneHandler} = Base.${getOneHandler};
export const ${updateHandler} = Base.${updateHandler};
export const ${deleteHandler} = Base.${deleteHandler};
`;
  writeIfNotExists(`${controllersPath}/${modelName}Controller.js`, controllerContent);

  // ---------- ROUTES ----------
  // NO se sobrescribe
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  ${createHandler},
  ${listHandler},
  ${getOneHandler},
  ${updateHandler},
  ${deleteHandler}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", ${listHandler});
router.get("/:id", ${getOneHandler});
router.post("/", ${createHandler});
router.put("/:id", ${updateHandler});
router.delete("/:id", ${deleteHandler});

export default router;
`;
  writeIfNotExists(`${routesPath}/${modelName}Routes.js`, routeContent);

  console.log(`✅ CRUD generado para: ${modelName}`);
}

console.log("🎉 Base+services regenerados; controllers/rutas personalizados conservados.");
