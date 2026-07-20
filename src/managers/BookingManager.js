import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { ServiceManager } from "./ServiceManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BookingManager {
  constructor(filePath = path.join(__dirname, "../data/bookings.json")) {
    this.path = filePath;
    this.serviceManager = new ServiceManager();
  }

  async readBookings() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al leer el archivo:", error.message);
      return [];
    }
  }

  async writeBookings(bookings) {
    await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
  }

  async getBookings() {
    return this.readBookings();
  }

  async getBookingById(id) {
    const bookings = await this.readBookings();
    return bookings.find((booking) => booking.id === Number(id)) || null;
  }

  async addBooking(booking) {
    const { serviceId, clientName, date } = booking;

    if (!serviceId || !clientName || !date) {
      throw new Error("Faltan campos obligatorios de la reserva");
    }

    const service = await this.serviceManager.getServiceById(serviceId);

    if (!service) {
      throw new Error(`No existe un servicio con id ${serviceId}`);
    }

    const bookings = await this.readBookings();
    const id = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;

    const newBooking = {
      id,
      serviceId: Number(serviceId),
      clientName,
      date,
      status: booking.status || "pending",
    };

    bookings.push(newBooking);
    await this.writeBookings(bookings);

    return newBooking;
  }

  async updateBooking(id, updates) {
    const bookings = await this.readBookings();
    const index = bookings.findIndex((booking) => booking.id === Number(id));

    if (index === -1) {
      return null;
    }

    bookings[index] = {
      ...bookings[index],
      ...updates,
      id: bookings[index].id,
    };

    await this.writeBookings(bookings);
    return bookings[index];
  }

  async deleteBooking(id) {
    const bookings = await this.readBookings();
    const filtered = bookings.filter((booking) => booking.id !== Number(id));

    if (filtered.length === bookings.length) {
      return false;
    }

    await this.writeBookings(filtered);
    return true;
  }
}
