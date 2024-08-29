import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const data = {
  cities: [
    {
      cityName: "Lisbon",
      country: "Portugal",
      emoji: "🇵🇹",
      date: new Date("2027-10-31T15:59:59.138Z"),
      notes: "My favorite city so far!",
      position: {
        lat: 38.727881642324164,
        lng: -9.140900099907554,
      },
      id: "73930385",
    },
    {
      cityName: "Madrid",
      country: "Spain",
      emoji: "🇪🇸",
      date: new Date("2027-07-15T08:22:53.976Z"),
      notes: "",
      position: {
        lat: 40.46635901755316,
        lng: -3.7133789062500004,
      },
      id: "17806751",
    },
    {
      cityName: "Berlin",
      country: "Germany",
      emoji: "🇩🇪",
      date: new Date("2027-02-12T09:24:11.863Z"),
      notes: "Amazing 😃",
      position: {
        lat: 52.53586782505711,
        lng: 13.376933665713324,
      },
      id: "98443197",
    },
    {
      id: "5508",
      cityName: "Gobichettipalayam",
      country: "India",
      date: new Date("2024-08-13T12:35:12.737Z"),
      emoji: "🇮🇳",
      notes: "hello",
      position: {
        lat: 11.462251459155034,
        lng: 77.51249181260043,
      },
    },
    {
      id: "5469",
      cityName: "Coimbatore",
      country: "India",
      date: new Date("2024-08-19T07:52:27.022Z"),
      emoji: "🇮🇳",
      notes: "hello",
      position: {
        lat: 11.007598681509482,
        lng: 77.01416015625001,
      },
    },
  ],
};

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("geolocationDB");
    const collection = db.collection("cities");

    // Delete existing data
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(data.cities);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data", err);
  } finally {
    await client.close();
  }
}

seedDatabase();
