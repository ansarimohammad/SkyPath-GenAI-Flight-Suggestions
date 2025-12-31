import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateFlightSuggestions = async ({
  origin,
  destination,
  travelDate,
  budget,
  flightClass,
  travelers,
  flexibility,
}) => {
  const prompt = `You are an API that returns only valid JSON.

Generate flight suggestions from ${origin} to ${destination} for travel date ${travelDate}. 
User Preferences:
- Budget: ${budget}
- Class: ${flightClass}
- Travelers: ${travelers}
- Flexibility: ${flexibility}

Return ONLY valid, clean JSON with this exact structure (no explanations, no markdown):

{
  "searchDetails": {
    "from": "${origin}",
    "to": "${destination}",
    "date": "${travelDate}",
    "travelers": "${travelers}",
    "class": "${flightClass}",
    "budget": "${budget}"
  },
  "bestOptions": [
    {
      "airline": "Airline Name",
      "flightNumber": "XX123",
      "aircraft": "Boeing 737 / Airbus A320",
      "departure": {
        "airport": "Airport Name (CODE)",
        "time": "HH:MM",
        "terminal": "Terminal X"
      },
      "arrival": {
        "airport": "Airport Name (CODE)",
        "time": "HH:MM",
        "terminal": "Terminal X"
      },
      "duration": "Xh XXm",
      "stops": "Non-stop / 1 stop / 2 stops",
      "layover": "City Name (Xh XXm)" or null,
      "estimatedPrice": "Rs. X,XXX",
      "amenities": [
        "In-flight meal",
        "WiFi available",
        "Entertainment system"
      ],
      "baggageAllowance": {
        "cabin": "7 kg",
        "checkedIn": "15 kg"
      },
      "cancellationPolicy": "Refundable / Non-refundable / Partially refundable"
    }
  ],
  "alternativeOptions": [
    {
      "airline": "Budget Airline Name",
      "flightNumber": "XX456",
      "aircraft": "Aircraft model",
      "departure": {
        "airport": "Airport Name (CODE)",
        "time": "HH:MM",
        "terminal": "Terminal X"
      },
      "arrival": {
        "airport": "Airport Name (CODE)",
        "time": "HH:MM",
        "terminal": "Terminal X"
      },
      "duration": "Xh XXm",
      "stops": "Non-stop / 1 stop / 2 stops",
      "layover": "City Name (Xh XXm)" or null,
      "estimatedPrice": "Rs. X,XXX",
      "amenities": [
        "Basic seating",
        "No meals included"
      ],
      "baggageAllowance": {
        "cabin": "7 kg",
        "checkedIn": "15 kg"
      },
      "cancellationPolicy": "Non-refundable"
    }
  ],
  "travelTips": [
    "💡 Book 2-3 months in advance for best prices",
    "⏰ Arrive at airport 2-3 hours before departure",
    "📱 Download airline app for mobile boarding pass"
  ],
  "airportInfo": {
    "departure": {
      "name": "Airport Full Name",
      "code": "XXX",
      "location": "City, Country",
      "facilities": [
        "Lounges",
        "Duty-free shopping",
        "Restaurants"
      ],
      "transportation": [
        "Metro/Subway access",
        "Airport taxi service",
        "Bus connections"
      ]
    },
    "arrival": {
      "name": "Airport Full Name",
      "code": "XXX",
      "location": "City, Country",
      "facilities": [
        "Lounges",
        "Currency exchange",
        "Car rentals"
      ],
      "transportation": [
        "Metro/Subway access",
        "Airport taxi service",
        "Bus connections"
      ]
    }
  },
  "visaRequirements": "Visa required / Visa on arrival / No visa required / E-visa available",
  "bookingPlatforms": [
    "Airline official website",
    "MakeMyTrip",
    "Cleartrip",
    "Goibibo",
    "Google Flights"
  ],
  "priceComparison": {
    "cheapestMonth": "Month name",
    "peakSeason": "Month - Month",
    "averagePrice": "Rs. X,XXX - Rs. X,XXX"
  },
  "weatherAtDestination": "☀️ Expected weather on travel date: temperature range in Celsius",
  "importantReminders": [
    "📋 Check passport validity (6 months minimum)",
    "💉 Review vaccination requirements",
    "🧳 Label all baggage clearly",
    "📞 Save airline customer service number"
  ]
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

   try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text);
    return json;
  } catch (e) {
    throw new Error("Failed to parse Gemini response as JSON");
  }
};