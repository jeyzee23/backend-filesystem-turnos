# Backend FileSystem — Turnos y Reservas

API Node.js + Express con persistencia en archivos JSON usando `fs.promises`.

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
    services.json
    bookings.json
    products.json
  managers/
    ServiceManager.js
    BookingManager.js
    ProductManager.js
  routes/
  app.js
  server.js
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET/POST/PUT/DELETE | `/api/services` | CRUD de servicios |
| GET/POST/PUT/DELETE | `/api/bookings` | CRUD de reservas |
| GET/POST | `/api/products` | CRUD básico de productos |

## Postman

Importar: `postman/Turnos-FileSystem.postman_collection.json`

## Demo ProductManager

```bash
npm run demo:products
```
