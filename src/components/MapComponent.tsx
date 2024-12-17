// src/components/MapComponent.tsx
import React, { useState } from 'react';
import Map, { Marker, Source, Layer, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MAPBOX_TOKEN from '../config'; // Adjust the path if necessary

const MapComponent: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 14,
  });

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // Define polygon coordinates (GeoJSON format)
  const polygonData = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-74.006, 40.7128],
          [-74.001, 40.7128],
          [-74.001, 40.7178],
          [-74.006, 40.7178],
          [-74.006, 40.7128], // Closing the polygon
        ],
      ],
    },
  };

  // Define markers
  const markers = [
    { id: 1, coordinates: [-74.006, 40.7128], title: 'Marker 1' },
    { id: 2, coordinates: [-74.001, 40.7178], title: 'Marker 2' },
    // Add more markers as needed
  ];

  return (
    <div className="h-screen w-full">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }} // Correct usage
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Add Navigation Controls */}
        <NavigationControl position="top-left" />

        {/* Polygon Source and Layers */}
        <Source id="polygon" type="geojson" data={polygonData}>
          <Layer
            id="polygonLayer"
            type="fill"
            paint={{
              'fill-color': '#888888',
              'fill-opacity': 0.4,
            }}
          />
          <Layer
            id="polygonOutline"
            type="line"
            paint={{
              'line-color': '#000',
              'line-width': 2,
            }}
          />
        </Source>

        {/* Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.coordinates[0]}
            latitude={marker.coordinates[1]}
            anchor="bottom"
          >
            <button
              className="bg-blue-500 text-white rounded-full px-3 py-1 shadow-lg focus:outline-none"
              onClick={() => setSelectedMarker(marker.id)}
            >
              📍
            </button>
          </Marker>
        ))}

        {/* Popup */}
        {selectedMarker !== null && (
          <Popup
            longitude={
              markers.find((m) => m.id === selectedMarker)?.coordinates[0] || viewState.longitude
            }
            latitude={
              markers.find((m) => m.id === selectedMarker)?.coordinates[1] || viewState.latitude
            }
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div className="p-2">
              <h3 className="text-lg font-bold">
                {markers.find((m) => m.id === selectedMarker)?.title}
              </h3>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
