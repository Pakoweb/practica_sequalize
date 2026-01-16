# API REST con Sequelize + Express (MVC reducida) + AutoCRUD

Proyecto de práctica con **Node.js + Express + Sequelize (MySQL)**.

## Estructura (MVC reducida)

```
config/          # conexión y configuración (Sequelize)
models/          # modelos Sequelize (generados con sequelize-auto)
services/        # acceso a datos (CRUD por modelo)
controllers/     # controladores HTTP
controllers/base # controladores base (regenerables por AutoCRUD)
routes/          # rutas Express por recurso
server.js        # arranque del servidor + auto-montaje de rutas
autocrud.js      # generador AutoCRUD
```

La idea es:
- **Model**: `models/` (definición) + `services/` (operaciones CRUD).
- **Controller**: `controllers/`.
- **Route**: `routes/`.

---

## Requisitos

- Node.js 18+ (recomendado)
- MySQL 8+

---

## 1) Instalar dependencias

```bash
npm install
```

---

## 2) Configurar `.env`

1. Crea tu archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

2. Edita `.env` con tus datos:

```env
PORT=3000
DB_HOST=localhost
DB_NAME=api_rest_db
DB_USER=root
DB_PASS=
DB_DIALECT=mysql
```


---

## 3) Migraciones / Seed (si aplica)

Este proyecto **no usa** `sequelize-cli` ni migraciones/seed.

Al arrancar el servidor se ejecuta:

- `sequelize.sync({ alter: true })`

Esto crea/actualiza las tablas automáticamente según los modelos.

---

## 4) Lanzar el servidor

### Modo desarrollo (con reinicio automático)

```bash
npm run dev
```

### Modo normal

```bash
npm start
```

Servidor por defecto:

- `http://localhost:3000`

Todas las rutas se montan bajo:

- `http://localhost:3000/api/<recurso>`

---

## 5) Ejecutar el AutoCRUD

El generador AutoCRUD lee todos los archivos de `models/*.js` (excepto `init-models.js`) y genera:

- `services/<modelo>Service.js` *(se regenera SIEMPRE)*
- `controllers/base/<modelo>BaseController.js` *(se regenera SIEMPRE)*
- `controllers/<modelo>Controller.js` *(solo si NO existe)*
- `routes/<modelo>Routes.js` *(solo si NO existe)*

Ejecuta:

```bash
npm run autocrud
```

### Importante (cómo personalizar sin perder cambios)

- Si quieres lógica propia, edita **solo**:
  - `controllers/<modelo>Controller.js` (no se sobrescribe)
  - `routes/<modelo>Routes.js` (no se sobrescribe)
- Los archivos en `controllers/base/` y `services/` se consideran “generados” y pueden regenerarse.

---

## 6) Ejemplos de endpoints (mínimo 1 recurso)

Ejemplo con el recurso **productos**:

Base URL:

- `http://localhost:3000/api/productos`

### Listar

```bash
curl http://localhost:3000/api/productos
```

### Obtener por id

```bash
curl http://localhost:3000/api/productos/1
```

### Crear

> Ajusta los campos según tu tabla `productos`.

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Teclado",
    "precio": 19.99,
    "stock": 10
  }'
```

### Actualizar

```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 25
  }'
```

### Eliminar

```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

---

## Notas

- El servidor monta automáticamente cualquier archivo `routes/*Routes.js` como `/api/<nombreDelArchivoSinRoutes>`.
- Para el recurso `log`, además se expone la ruta compatible:
  - `/api/logs`
