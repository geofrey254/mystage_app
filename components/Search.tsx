// components/Search.js
"use client";

import React, { useState } from "react";
import { Place } from "@/constants/types"; // Ensure this type is defined as before

const Search = ({ onPlaceSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (!query) {
      setPlaces([]);
      return;
    }

    // Use the Google Maps Places service
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Make sure the service is ready before calling the API
    service.textSearch(
      {
        query,
        location: { lat: -1.2847474009541844, lng: 36.82601472668886 }, // Center of the map
        radius: 10000, // Search within 10km radius
      },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results); // Set places only if results are valid
        } else {
          console.error("Places service error:", status);
          setPlaces([]); // Reset places if there's an error
        }
      }
    );
  };

  const handlePlaceSelect = (place: Place) => {
    onPlaceSelect(place); // Notify the parent component of the selected place
    setSearchTerm(""); // Clear the search input
    setPlaces([]); // Clear the search results
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search for a place..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {places.length > 0 && (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {places.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handlePlaceSelect(place)}
              style={{
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #ddd",
                margin: "5px 0",
              }}
            >
              {place.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
