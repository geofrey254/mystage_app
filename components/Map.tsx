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

  const googleMapsKey: string =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

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
    <section className="p-0 md:p-8 bg-[#462f01]">
      <div className="md:rounded-xl border-4 md:border-8 border-[#ffa800] shadow-xl shadow-[#ffa800]">
        {" "}
        <LoadScript googleMapsApiKey={googleMapsKey}>
          <div className="relative">
            <div className="absolute w-full flex justify-center px-3 py-2 md:py-4 md:px-4">
              <input
                type="text"
                placeholder="Where are you headed to?"
                value={searchTerm}
                onChange={handleSearchChange}
                className="z-10 p-2 md:p-6 rounded-md ps-8 border-2 border-[#ffa800] focus:outline-none focus:ring-0 focus:border-transparent shadow-md shadow-[#3a2b0d] w-[50vh] md:w-[80vh] h-[7vh] md:h-[5vh]"
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
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30), // Adjusts the positioning of the InfoWindow relative to the marker
                    maxWidth: 2000, // Set a max width for the InfoWindow
                  }}
                >
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{selectedStage.name}</h4>
                    <p className="text-lg">{selectedStage.description}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </section>
  );
};

export default Map;
