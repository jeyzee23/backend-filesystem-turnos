import express from "express";
import servicesRouter from "./routes/services.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo" });
});

app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/products", productsRouter);

export default app;
