import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  searchDetails: {
    from: String,
    to: String,
    date: String,
    travelers: String,
    class: String,
    budget: String,
  },
  bestOptions: [
    {
      airline: String,
      flightNumber: String,
      aircraft: String,
      departure: {
        airport: String,
        time: String,
        terminal: String,
      },
      arrival: {
        airport: String,
        time: String,
        terminal: String,
      },
      duration: String,
      stops: String,
      layover: String,
      estimatedPrice: String,
      amenities: [String],
      baggageAllowance: {
        cabin: String,
        checkedIn: String,
      },
      cancellationPolicy: String,
    },
  ],
  alternativeOptions: [
    {
      airline: String,
      flightNumber: String,
      aircraft: String,
      departure: {
        airport: String,
        time: String,
        terminal: String,
      },
      arrival: {
        airport: String,
        time: String,
        terminal: String,
      },
      duration: String,
      stops: String,
      layover: String,
      estimatedPrice: String,
      amenities: [String],
      baggageAllowance: {
        cabin: String,
        checkedIn: String,
      },
      cancellationPolicy: String,
    },
  ],
  travelTips: [String],
  airportInfo: {
    departure: {
      name: String,
      code: String,
      location: String,
      facilities: [String],
      transportation: [String],
    },
    arrival: {
      name: String,
      code: String,
      location: String,
      facilities: [String],
      transportation: [String],
    },
  },
  visaRequirements: String,
  bookingPlatforms: [String],
  priceComparison: {
    cheapestMonth: String,
    peakSeason: String,
    averagePrice: String,
  },
  weatherAtDestination: String,
  importantReminders: [String],
}, { timestamps: true });

export const Flight = mongoose.model("Flight", flightSchema);