import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProductManager {
  constructor(filePath = path.join(__dirname, "../data/products.json")) {
    this.path = filePath;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id,
      title: product.title,
      price: product.price,
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }
}
