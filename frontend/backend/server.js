const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
  const result = await fetch(url);
  const data = await result.json();
  res.json(data);
});

app.get("/api/traffic", async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&key=${process.env.TOMTOM_API_KEY}`;
  const result = await fetch(url);
  const data = await result.json();
  res.json(data);
});

app.post("/weather", async (req, res) => {
  const { city, temperature, humidity, lat, lon } = req.body;
  await pool.query(
    `INSERT INTO weather_history (city, temperature, humidity, coordinates)
     VALUES ($1, $2, $3, ST_Point($4, $5))`,
    [city, temperature, humidity, lon, lat]
  );
  res.json({ status: "OK" });
});

app.listen(3000, () => console.log("✅ Backend running on http://localhost:3000"));