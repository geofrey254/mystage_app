// components/Map.js
"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { busStages } from "@/constants"; // Ensure busStages has an array of bus stages
import mapStyle from "./mapStyle"; // Your custom map styles

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: -1.2847474009541844,
  lng: 36.82601472668886,
};

const Map = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStages, setFilteredStages] = useState(busStages);

  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = busStages.filter((stage) =>
      stage.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStages(filtered);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsKey}>
      <div className="relative">
        <div className="absolute w-full flex justify-center px-3 py-2 md:py-4 md:px-4">
          <input
            type="text"
            placeholder="Where are you headed to?"
            value={searchTerm}
            onChange={handleSearchChange}
            className="z-10 p-2 ps-8 border-2 border-[#ffa800] rounded-3xl focus:outline-none focus:ring-0 focus:border-transparent shadow-md shadow-[#ffa800] w-[50vh] md:w-[80vh] h-[7vh] md:h-[5vh]"
          />
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          options={{ styles: mapStyle }}
        >
          {filteredStages.map((stage) => (
            <Marker
              key={stage.id}
              position={{ lat: stage.latitude, lng: stage.longitude }}
              onClick={() => setSelectedStage(stage)}
            />
          ))}

          {selectedStage && (
            <InfoWindow
              position={{
                lat: selectedStage.latitude,
                lng: selectedStage.longitude,
              }}
              onCloseClick={() => setSelectedStage(null)}
            >
              <div>
                <h4 className="font-bold">{selectedStage.name}</h4>
                <p>{selectedStage.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
