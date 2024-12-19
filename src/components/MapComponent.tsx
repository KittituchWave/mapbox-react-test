import React, { useState, useRef, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Sun, AlertTriangle, CheckCircle, Tag, X } from "lucide-react"; // Import the X icon for a custom close button

// Define a type for the solar panel data
type SolarPanel = {
  id: number;
  longitude: number;
  latitude: number;
  title: string;
  status: string;
  description: string;
  location: string;
  severity: "normal" | "warning"; // Added severity for styling
};

const MapComponent: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 100.541,
    latitude: 13.73,
    zoom: 14, // Zoom level suitable for markers
  });

  const [selectedPanel, setSelectedPanel] = useState<SolarPanel | null>(null); // Typed state for the selected solar panel

  const mapRef = useRef<MapRef | null>(null);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Solar panel markers near Lumphini Park
  const solarPanelMarkers: SolarPanel[] = useMemo(
    () => [
      {
        id: 1,
        longitude: 100.5412,
        latitude: 13.7304,
        title: "Panel-01",
        status: "high-temp",
        description: "Overheating detected in sector 3 #A102",
        location: "Sector 3, North Wing",
        severity: "warning", // Red styling
      },
      {
        id: 2,
        longitude: 100.5425,
        latitude: 13.7308,
        title: "Panel-02",
        status: "operational",
        description: "All systems operational #A101",
        location: "Sector 1, East Wing",
        severity: "normal", // Normal styling
      },
      {
        id: 3,
        longitude: 100.5408,
        latitude: 13.7299,
        title: "Panel-03",
        status: "operational",
        description: "All systems operational #A102",
        location: "Sector 2, West Wing",
        severity: "normal",
      },
      {
        id: 4,
        longitude: 100.5405,
        latitude: 13.7311,
        title: "Panel-04",
        status: "operational",
        description: "All systems operational #A103",
        location: "Sector 2, West Wing",
        severity: "normal",
      },
      {
        id: 5,
        longitude: 100.5419,
        latitude: 13.7315,
        title: "Panel-05",
        status: "high-temp",
        description: "Overheating detected in sector 1 #A104",
        location: "Sector 1, South Wing",
        severity: "warning",
      },
    ],
    []
  );

  if (!mapboxToken) {
    console.error(
      "Mapbox token is not defined. Please set VITE_MAPBOX_TOKEN in your .env file."
    );
    return <div>Error: Mapbox token is not defined.</div>;
  }

  return (
    <div className="h-screen w-full relative">
      {/* Map */}
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
        ref={mapRef}
      >
        {/* Navigation Control */}
        <div className="absolute top-4 left-4 z-10">
          <NavigationControl />
        </div>

        {/* Solar Panel Markers */}
        {solarPanelMarkers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
          >
            <div
              className="cursor-pointer"
              onClick={() => setSelectedPanel(marker)}
            >
              {marker.severity === "warning" ? (
                <AlertTriangle
                  className="w-8 h-8 text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <Sun className="w-8 h-8 text-yellow-500" aria-hidden="true" />
              )}
            </div>
          </Marker>
        ))}

        {/* Popup for Selected Panel */}
        {selectedPanel && (
          <Popup
            longitude={selectedPanel.longitude}
            latitude={selectedPanel.latitude}
            closeButton={false} // Remove the default close button
            closeOnClick={false}
            anchor="top"
            className={`rounded-lg shadow-lg max-w-xs p-4 relative ${
              selectedPanel.severity === "warning"
                ? "border-l-4 border-red-500"
                : "border-l-4 border-green-500"
            }`}
            style={{
              backgroundColor: "white", // Ensure the popup has a solid white background
              color: "black", // Ensure text is visible
              border: "1px solid #ccc", // Add a border for clarity
            }}
          >
            {/* Custom Close Button */}
            <button
              onClick={() => setSelectedPanel(null)}
              className="absolute top-2 right-2 bg-white-200 hover:bg-gray-100 rounded-full p-1 shadow-md"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 text-black-600 hover:text-red-600" />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                {selectedPanel.severity === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                )}
                <h3 className="font-bold text-lg">{selectedPanel.title}</h3>
              </div>
              <p className="text-gray-700 mb-2">{selectedPanel.description}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Sun
                  className={`w-4 h-4 mr-1 ${
                    selectedPanel.severity === "warning"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                />
                <span>{selectedPanel.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                <span>{selectedPanel.status}</span>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
