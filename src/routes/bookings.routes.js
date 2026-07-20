import { Router } from "express";
import { BookingManager } from "../managers/BookingManager.js";

const router = Router();
const bookingManager = new BookingManager();

router.get("/", async (req, res) => {
  const bookings = await bookingManager.getBookings();
  res.json({ status: "success", payload: bookings });
});

router.get("/:id", async (req, res) => {
  const booking = await bookingManager.getBookingById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      status: "error",
      message: "Reserva no encontrada",
    });
  }

  res.json({ status: "success", payload: booking });
});

router.post("/", async (req, res) => {
  try {
    const booking = await bookingManager.addBooking(req.body);
    res.status(201).json({ status: "success", payload: booking });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const booking = await bookingManager.updateBooking(req.params.id, req.body);

  if (!booking) {
    return res.status(404).json({
      status: "error",
      message: "Reserva no encontrada",
    });
  }

  res.json({ status: "success", payload: booking });
});

router.delete("/:id", async (req, res) => {
  const deleted = await bookingManager.deleteBooking(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: "Reserva no encontrada",
    });
  }

  res.json({ status: "success", message: "Reserva eliminada" });
});

export default router;
