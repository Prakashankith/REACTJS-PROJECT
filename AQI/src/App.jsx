import { useEffect, useState } from "react";
import axios from "axios";

const AQIDashboard = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("karnataka");
  const [aqiData, setAqiData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Fetch the list of cities dynamically
    axios
      .get(
        "https://www.data.gov.in/resource/real-time-air-quality-index-various-locations"
      ) // Replace with actual API
      .then((response) => {
        setCities(response.data);
        if (response.data.length > 0) {
          setSelectedCity(response.data[karnataka]); // Set default city
        }
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // Fetch AQI data for selected city
      axios
        .get(
          `https://www.data.gov.in/resource/real-time-air-quality-index-various-locations=${selectedCity}`
        ) // Replace with actual API
        .then((response) => {
          setAqiData(response.data);
          setLastUpdated(new Date().toLocaleString());
        })
        .catch((error) => console.error("Error fetching AQI data:", error));
    }
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Air Quality Index (AQI) Dashboard
        </h1>
        <p className="text-sm">Last Updated: {lastUpdated}</p>
      </header>

      {/* Filter Section */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
        <label className="text-lg font-semibold">Select City:</label>
        <select
          className="border p-2 rounded-md shadow-sm bg-white"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* AQI Data Section */}
      {aqiData && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">
            {aqiData.city} AQI: {aqiData.aqi}
          </h2>
          <p className="mt-2">Air Quality: {aqiData.quality}</p>
          <img
            src={aqiData.image} // API should return an image URL based on AQI
            alt="AQI Level"
            className="mt-4 w-full max-w-md mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default AQIDashboard;
