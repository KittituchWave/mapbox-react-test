import React, { useState, useRef } from "react";
import Map, { NavigationControl, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkerComponent from "./MarkerComponent";
import PopupComponent from "./PopupComponent";
import { solarPanelMarkers } from "../data/solarPanelData";

const MapComponent: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 100.541,
    latitude: 13.73,
    zoom: 14,
  });

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11" // Default style
  );

  const [selectedPanel, setSelectedPanel] = useState<
    (typeof solarPanelMarkers)[0] | null
  >(null);

  const mapRef = useRef<MapRef | null>(null);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

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
        mapStyle={mapStyle}
        mapboxAccessToken={mapboxToken}
        ref={mapRef}
      >
        {/* Navigation Control */}
        <div className="absolute top-4 left-4 z-10">
          <NavigationControl />
        </div>

        {/* Render Markers */}
        {solarPanelMarkers.map((marker) => (
          <MarkerComponent
            key={marker.id}
            marker={marker}
            onClick={() => setSelectedPanel(marker)}
          />
        ))}

        {/* Render Popup */}
        {selectedPanel && (
          <PopupComponent
            selectedPanel={selectedPanel}
            onClose={() => setSelectedPanel(null)}
          />
        )}
      </Map>

      {/* Map Style Toggle */}
      <div className="absolute top-3.5 right-16 bg-white p-2 rounded shadow-md">
        <label htmlFor="mapStyle" className="block font-bold mb-1">
          Map Style
        </label>
        <select
          id="mapStyle"
          value={mapStyle}
          onChange={(e) => setMapStyle(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="mapbox://styles/mapbox/streets-v11">Streets</option>
          <option value="mapbox://styles/mapbox/dark-v10">Dark Mode</option>
          <option value="mapbox://styles/mapbox/light-v10">Light Mode</option>
        </select>
      </div>
    </div>
  );
};

export default MapComponent;
