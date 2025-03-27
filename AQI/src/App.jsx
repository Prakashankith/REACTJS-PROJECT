import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import Filters from "./Components/Filters";
import AQIDisplay from "./Components/AQIDisplay";

function App() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // This will store the cities
  const [aqiData, setAqiData] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch states data when the component mounts
  useEffect(() => {
    axios
      .get(
        "https://api.data.gov.in/resource/real-time-air-quality-index-various-locations"
      )
      .then((response) => {
        // Assuming the API provides a list of states (this can be updated based on actual API response)
        const uniqueStates = [
          ...new Set(response.data.records.map((record) => record.state)),
        ];
        setStates(uniqueStates);
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // Fetch cities and AQI data based on selected state and city
  useEffect(() => {
    if (selectedState && selectedCity) {
      axios
        .get(
          `https://api.data.gov.in/resource/real-time-air-quality-index-various-locations?state=${selectedState}&city=${selectedCity}`
        )
        .then((response) => {
          setAqiData(response.data.records);
          setLastUpdated(new Date().toLocaleString());
        })
        .catch((error) => console.error("Error fetching AQI data:", error));
    }
  }, [selectedState, selectedCity]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header lastUpdated={lastUpdated} />
      <div className="container mx-auto p-4">
        <Filters
          states={states}
          cities={cities} // Pass cities state to Filters component
          setSelectedState={setSelectedState}
          setSelectedCity={setSelectedCity}
          setCities={setCities} // Pass setCities function to Filters component
        />
        <AQIDisplay aqiData={aqiData} />
      </div>
    </div>
  );
}

export default App;
