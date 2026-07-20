# ProductManager — Persistencia con FileSystem

API Node.js + Express con un `ProductManager` que persiste productos en un archivo JSON usando `fs.promises`.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
npm run dev
```

Servidor: `http://localhost:8080`

## Estructura

```text
src/
  data/
    products.json
  managers/
    ProductManager.js
  routes/
    products.routes.js
  app.js
  server.js
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/products` | Listar productos |
| POST | `/api/products` | Crear producto |

## Postman

Importar: `postman/Products-FileSystem.postman_collection.json`

## Demo

```bash
npm run demo:products
```
