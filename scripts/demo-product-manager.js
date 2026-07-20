import { ProductManager } from "../src/managers/ProductManager.js";

const manager = new ProductManager();

const run = async () => {
  console.log("Productos iniciales:", await manager.getProducts());

  await manager.addProduct({ title: "Teclado", price: 25 });
  await manager.addProduct({ title: "Mouse", price: 15 });

  console.log("Productos finales:", await manager.getProducts());
};

run();
