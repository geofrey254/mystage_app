"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer"; // Correctly import MarkerClusterer
import { busStages } from "@/constants"; // Ensure busStages has an array of bus stages
import mapStyle from "./mapStyle"; // Your custom map styles

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: -1.2847474009541844,
  lng: 36.82601472668886,
};

interface Stage {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStages, setFilteredStages] = useState(busStages);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const googleMapsKey: string =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const mapRef = useRef<google.maps.Map | null>(null);
  const clustererRef = useRef<MarkerClusterer | null>(null); // Ref for MarkerClusterer

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Permission denied. Please allow location access in your browser settings"
            );
            break;
          case error.POSITION_UNAVAILABLE:
            alert(
              "Location information is unavailable. Please try again later."
            );
            break;
          case error.TIMEOUT:
            alert(
              "The request to get your location timed out. Please try again."
            );
            break;
          default:
            alert("An unexpected error occurred.");
            break;
        }
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation && filteredStages.length > 0) {
      const nearestStage = filteredStages.reduce((prev, curr) => {
        const prevDistance = haversineDistance(currentLocation, {
          lat: prev.latitude,
          lng: prev.longitude,
        });
        const currDistance = haversineDistance(currentLocation, {
          lat: curr.latitude,
          lng: curr.longitude,
        });
        return currDistance < prevDistance ? curr : prev;
      });

      // Center the map and zoom in on the nearest stage
      if (nearestStage) {
        if (mapRef.current) {
          mapRef.current.setCenter({
            lat: nearestStage.latitude,
            lng: nearestStage.longitude,
          });
          mapRef.current.setZoom(18); // Adjust the zoom level as needed
        }
      }
    } else if (currentLocation) {
      // Center the map on current location if no filtered stages are available
      if (mapRef.current) {
        mapRef.current.setCenter(currentLocation);
        mapRef.current.setZoom(16); // Default zoom level for current location
      }
    } else {
      // Reset selected stage if no stages are available
      setSelectedStage(null);
    }
  }, [currentLocation, filteredStages]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = busStages.filter((stage) =>
      stage.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStages(filtered);

    // If there are no filtered stages, reset the selected stage
    if (filtered.length === 0) {
      setSelectedStage(null);
    }
  };

  // to delete
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    const markers = filteredStages.map((stage) => {
      const marker = new google.maps.Marker({
        position: { lat: stage.latitude, lng: stage.longitude },
        title: stage.name,
      });

      marker.addListener("click", () => {
        setSelectedStage(stage);
      });

      return marker;
    });

    clustererRef.current = new MarkerClusterer({
      map,
      markers,
    });
  };

  useEffect(() => {
    if (mapRef.current && clustererRef.current) {
      clustererRef.current.clearMarkers(); // Clear existing markers
      const markers = filteredStages.map((stage) => {
        const marker = new google.maps.Marker({
          position: { lat: stage.latitude, lng: stage.longitude },
          title: stage.name,
        });

        marker.addListener("click", () => {
          setSelectedStage(stage);
        });

        return marker;
      });

      clustererRef.current.addMarkers(markers);
    }
  }, [filteredStages]);

  return (
    <section className="p-0 md:p-8 bg-[#462f01]">
      <div className="md:rounded-xl border-4 md:border-8 border-[#ffa800] shadow-xl shadow-[#ffa800]">
        <LoadScript googleMapsApiKey={googleMapsKey}>
          <div className="relative">
            <div className="absolute w-full flex justify-center bottom-0 px-3 py-2 md:py-4 md:px-4">
              <input
                type="text"
                placeholder="Where are you headed to?"
                value={searchTerm}
                onChange={handleSearchChange}
                className="z-10 bg-[#0000006e] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-2 md:p-6 rounded-md ps-8 border-2 border-[#ffa800] focus:outline-none focus:ring-0 focus:border-transparent shadow-md shadow-[#3a2b0d] w-[50vh] md:w-[80vh] h-[7vh] md:h-[5vh] placeholder:text-white animate-bounce focus:animate-none text-white"
              />
            </div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentLocation || center}
              zoom={16}
              options={{
                styles: mapStyle,
                mapTypeId: "hybrid",
                mapTypeControl: false,
              }}
              onLoad={onMapLoad}
            >
              {filteredStages.length > 0 ? (
                filteredStages.map((stage) => (
                  <Marker
                    key={stage.id}
                    position={{ lat: stage.latitude, lng: stage.longitude }}
                    onClick={() => setSelectedStage(stage)}
                  />
                ))
              ) : (
                <div className="text-white text-lg text-center">
                  No results found.
                </div>
              )}

              {selectedStage && (
                <InfoWindow
                  position={{
                    lat: selectedStage.latitude,
                    lng: selectedStage.longitude,
                  }}
                  onCloseClick={() => setSelectedStage(null)}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -30),
                    maxWidth: 2000,
                  }}
                >
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{selectedStage.name}</h4>
                    <div className="bg-[#ffaa0069] grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-y-1 md:gap-x-2 p-4 text-black rounded-lg shadow-md">
                      {selectedStage?.description
                        .split(",")
                        .map((stage, index) => (
                          <p key={index} className="text-sm flex">
                            <span className="hidden md:flex">{"📌"}</span>
                            {stage.trim()}
                          </p>
                        ))}
                    </div>
                  </div>
                </InfoWindow>
              )}

              {currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  onClick={() => setSelectedStage(null)}
                />
              )}
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </section>
  );
};

export default Map;
