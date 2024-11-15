import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { busStages } from "@/constants"; // Assuming busStages is available
import mapStyle from "./mapStyle"; // Your map style
import { MapPin } from "lucide-react"; // Import the icon

const containerStyle = { width: "100%", height: "80vh" };
const center = { lat: -1.2847474009541844, lng: 36.82601472668886 };
interface Stage {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStages, setFilteredStages] = useState(busStages);
  const [currentLocation, setCurrentLocation] = useState(null);

  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mapRef = useRef(null);
  const clustererRef = useRef(null);

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

      if (nearestStage) {
        if (mapRef.current) {
          mapRef.current.setCenter({
            lat: nearestStage.latitude,
            lng: nearestStage.longitude,
          });
          mapRef.current.setZoom(18);
        }
      }
    } else if (currentLocation) {
      if (mapRef.current) {
        mapRef.current.setCenter(currentLocation);
        mapRef.current.setZoom(16);
      }
    } else {
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

    if (filtered.length === 0) {
      setSelectedStage(null);
    }
  };

  const onMapLoad = (map) => {
    mapRef.current = map;

    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    const markers = filteredStages.map((stage) => {
      // Using the recommended AdvancedMarkerElement
      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: stage.latitude, lng: stage.longitude },
        content: document.createElement("div"), // Custom content (optional)
      });

      // Add event listener to open the InfoWindow on marker click
      advancedMarker.addListener("click", () => {
        setSelectedStage(stage);
      });

      return advancedMarker;
    });

    // Use MarkerClusterer to manage the markers
    clustererRef.current = new MarkerClusterer({
      map,
      markers,
    });
  };

  const onMapUnmount = () => {
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }
    mapRef.current = null;
  };

  return (
    <section className="p-0 md:p-8 bg-[#462f01]">
      <div className="md:rounded-xl border-4 md:border-8 border-[#ffa800] shadow-xl shadow-[#ffa800]">
        {/* LoadScript with async flag for improved performance */}
        <LoadScript googleMapsApiKey={googleMapsKey} async>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || center}
            zoom={currentLocation ? 16 : 14}
            options={{
              styles: mapStyle,
              mapTypeId: "hybrid",
              mapTypeControl: false,
            }}
            onLoad={onMapLoad}
            onUnmount={onMapUnmount}
          >
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
                <div className="p-4 flex flex-col gap-4">
                  <h4 className="font-bold text-lg text-center">
                    {selectedStage.name}
                  </h4>
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
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
};

export default Map;
