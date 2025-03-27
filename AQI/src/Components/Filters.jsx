import React, { useEffect } from "react";
import axios from "axios";

const Filters = ({
  states,
  cities,
  setCities,
  setSelectedState,
  setSelectedCity,
}) => {
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);

    // Fetch cities dynamically based on the selected state
    axios
      .get(
        `https://api.data.gov.in/resource/real-time-air-quality-index-various-locations?state=${state}`
      )
      .then((response) => {
        // Log the response to see if cities are included in the response
        console.log("Response for cities:", response.data);

        // Assuming the API returns a list of records with city information
        const cityList = [
          ...new Set(response.data.records.map((record) => record.city)),
        ];

        // Log the city list
        console.log("City List:", cityList);

        // Update cities state with the fetched city list
        setCities(cityList);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-sm font-semibold">State</label>
        <select
          className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {cities.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-semibold">City</label>
          <select
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            onChange={handleCityChange}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Filters;
