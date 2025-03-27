import React from "react";

const Header = ({ lastUpdated }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">AQI Dashboard</h1>
      <p className="text-sm">Last Updated: {lastUpdated}</p>
    </header>
  );
};

export default Header;
