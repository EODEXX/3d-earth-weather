CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE weather_history (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100),
  temperature FLOAT,
  humidity INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  coordinates GEOGRAPHY(POINT, 4326)
);