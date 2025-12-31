import express from "express";
import { generateFlightSuggestions } from "../API/geminiAPI.js";
import { Flight } from "../models/flight.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authenticateUser, async (req, res) => {
  const { origin, destination, travelDate, budget, flightClass, travelers, flexibility } =
    req.body;

  try {
    const flightData = await generateFlightSuggestions({
      origin,
      destination,
      travelDate,
      budget,
      flightClass,
      travelers,
      flexibility,
    });

    const savedFlight = await Flight.create({
      ...flightData,
      userId: req.user._id,
    });

    res.json({ success: true, flight: savedFlight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/user-flights/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const flights = await Flight.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, flights });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight)
      return res
        .status(404)
        .json({ success: false, message: "Flight not found" });
    res.status(200).json({ success: true, flight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;