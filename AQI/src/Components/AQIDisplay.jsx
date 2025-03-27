import React from "react";

const AQIDisplay = ({ aqiData }) => {
  if (!aqiData)
    return (
      <p className="text-center text-lg text-gray-500">
        Select a city to view AQI data.
      </p>
    );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Air Quality Index (AQI)</h2>
      <ul>
        {aqiData.map((data, index) => (
          <li
            key={index}
            className="flex justify-between py-2 border-b border-gray-200"
          >
            <span className="text-sm">{data.city}</span>
            <span className="font-bold">{data.aqi}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AQIDisplay;
