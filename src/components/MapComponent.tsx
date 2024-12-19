import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin as MapPinned } from "lucide-react";
import { markers } from "../data/markersData";

const MapComponent: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 100.5018,
    latitude: 13.7563,
    zoom: 12,
  });

  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = useCallback((id: number) => {
    setSelectedMarkerId(id);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedMarkerId(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClosePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClosePopup]);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  if (!mapboxToken) {
    console.error(
      "Mapbox token is not defined. Please set VITE_MAPBOX_TOKEN in your .env file."
    );
    return <div>Error: Mapbox token is not defined.</div>;
  }

  return (
    <div className="h-screen w-full relative">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
      >
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <NavigationControl />
        </div>

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.coordinates[0]}
            latitude={marker.coordinates[1]}
            anchor="bottom"
          >
            <button
              className="bg-transparent rounded-full p-2 shadow-none focus:outline-none hover:opacity-90 transition-opacity duration-200"
              onClick={() => handleMarkerClick(marker.id)}
              aria-label={`View details for ${marker.title}`}
            >
              <MapPinned
                className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 stroke-2"
                aria-hidden="true"
              />
            </button>
          </Marker>
        ))}

        {selectedMarkerId !== null && (
          <Popup
            longitude={markers.find((marker) => marker.id === selectedMarkerId)!.coordinates[0]}
            latitude={markers.find((marker) => marker.id === selectedMarkerId)!.coordinates[1]}
            onClose={handleClosePopup}
            closeOnClick={false}
            closeButton={false}
            anchor="top"
            className="max-w-sm p-4 bg-white rounded-lg shadow-lg flex flex-col relative"
            focusAfterOpen={false}
          >
            <div
              ref={popupRef}
              tabIndex={-1}
              className="flex flex-col"
              aria-labelledby={`popup-title-${selectedMarkerId}`}
              aria-describedby={`popup-description-${selectedMarkerId}`}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close popup"
              >
                ✖
              </button>

              <img
                src={markers.find((marker) => marker.id === selectedMarkerId)!.image}
                alt={`${markers.find((marker) => marker.id === selectedMarkerId)!.title} Image`}
                className="rounded w-full h-48 object-cover mb-4"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=No+Image+Available";
                }}
              />

              <h3
                id={`popup-title-${selectedMarkerId}`}
                className="text-lg sm:text-xl font-semibold mb-2"
              >
                {markers.find((marker) => marker.id === selectedMarkerId)!.title}
              </h3>

              <p
                id={`popup-description-${selectedMarkerId}`}
                className="text-gray-700 text-base sm:text-lg"
              >
                {markers.find((marker) => marker.id === selectedMarkerId)!.description}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
