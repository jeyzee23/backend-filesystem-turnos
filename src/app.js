import express from "express";
import productsRouter from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo" });
});

app.use("/api/products", productsRouter);

export default app;
