// components/Map.js
"use client";
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { busStages } from "@/constants";
import mapStyle from "./mapStyle";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: -1.2847474009541844,
  lng: 36.82601472668886,
};

const Map = () => {
  const [selectedStage, setSelectedStage] = React.useState();
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log("Google Maps API Key:", googleMapsKey);

  return (
    <LoadScript googleMapsApiKey={googleMapsKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{ styles: mapStyle }}
      >
        {busStages.map((stage) => (
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
    </LoadScript>
  );
};

export default Map;
