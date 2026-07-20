import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json({ products });
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
