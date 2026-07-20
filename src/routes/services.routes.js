import { Router } from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const router = Router();
const serviceManager = new ServiceManager();

router.get("/", async (req, res) => {
  const services = await serviceManager.getServices();
  res.json({ status: "success", payload: services });
});

router.get("/:id", async (req, res) => {
  const service = await serviceManager.getServiceById(req.params.id);

  if (!service) {
    return res.status(404).json({
      status: "error",
      message: "Servicio no encontrado",
    });
  }

  res.json({ status: "success", payload: service });
});

router.post("/", async (req, res) => {
  try {
    const service = await serviceManager.addService(req.body);
    res.status(201).json({ status: "success", payload: service });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const service = await serviceManager.updateService(req.params.id, req.body);

  if (!service) {
    return res.status(404).json({
      status: "error",
      message: "Servicio no encontrado",
    });
  }

  res.json({ status: "success", payload: service });
});

router.delete("/:id", async (req, res) => {
  const deleted = await serviceManager.deleteService(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Servicio no encontrado",
    });
  }

  res.json({ status: "success", message: "Servicio eliminado" });
});

export default router;
