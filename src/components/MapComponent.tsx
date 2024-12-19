import React, { useState, useEffect, useRef, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import Lucide Icons
import { MapPin as MapPinned } from "lucide-react";

const MapComponent: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 100.5018, // Longitude for Bangkok
    latitude: 13.7563, // Latitude for Bangkok
    zoom: 12, // Zoom level suitable for city view
  });

  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const markers = useMemo(
    () => [
      {
        id: 1,
        coordinates: [100.4913, 13.75],
        title: "Grand Palace",
        description:
          "A complex of buildings at the heart of Bangkok, Thailand. It has been the official residence of the Kings of Siam since 1782.",
        image:
          "https://static.wixstatic.com/media/2cc94a_f41bf7cbf0d34a2faaf7f0e27aabb3b3~mv2.jpg",
      },
      {
        id: 2,
        coordinates: [100.4887, 13.7437],
        title: "Wat Arun",
        description:
          "Temple of Dawn, one of Bangkok’s most famous landmarks, known for its stunning porcelain-encrusted central prang (spire).",
        image:
          "https://static.wixstatic.com/media/2cc94a_07e55de318fe41538e17cb9de596cb45~mv2.jpg",
      },
      {
        id: 3,
        coordinates: [100.4931, 13.7467],
        title: "Wat Pho",
        description:
          "Temple of the Reclining Buddha, renowned for its giant reclining Buddha statue and traditional Thai massage school.",
        image:
          "https://res.cloudinary.com/thetripguru/image/upload/f_auto,c_limit,w_1080,q_auto/02-tours/g0ievepnwzlp1zuoyyw5",
      },
      {
        id: 4,
        coordinates: [100.55, 13.8],
        title: "Chatuchak Weekend Market",
        description:
          "One of the largest markets in the world, offering a vast array of goods from clothing and accessories to home decor and food.",
        image:
          "https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/attractions/chatuchak-w1800h1360.jpg",
      },
      {
        id: 5,
        coordinates: [100.5419, 13.7304],
        title: "Lumphini Park",
        description:
          "A large public park in Bangkok, providing a green oasis with walking paths, lakes, and recreational activities.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Aerial_view_of_Lumphini_Park.jpg/1200px-Aerial_view_of_Lumphini_Park.jpg",
      },
      {
        id: 6,
        coordinates: [100.529, 13.7467],
        title: "Siam Paragon",
        description:
          "A massive shopping mall in Bangkok, featuring luxury brands, a multiplex cinema, and a variety of dining options.",
        image: "https://www.siamparagon.co.th/public/images/aboutus/SPD.jpg",
      },
    ],
    []
  );

  const selectedMarker = useMemo(
    () => markers.find((marker) => marker.id === selectedMarkerId) || null,
    [selectedMarkerId, markers]
  );

  useEffect(() => {
    if (selectedMarker && popupRef.current) {
      popupRef.current.focus();
    }
  }, [selectedMarker]);

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
        style={{ width: "100%", height: "100%" }} // Ensures the map fills the container
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
              onClick={() => setSelectedMarkerId(marker.id)}
              aria-label={`View details for ${marker.title}`}
            >
              <MapPinned
                className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 stroke-2"
                aria-hidden="true"
              />
            </button>
          </Marker>
        ))}

        {selectedMarker && (
          <Popup
            longitude={selectedMarker.coordinates[0]}
            latitude={selectedMarker.coordinates[1]}
            onClose={() => setSelectedMarkerId(null)}
            closeOnClick={false}
            closeButton={false} // Removes the default close button
            anchor="top"
            className="max-w-sm p-4 bg-white rounded-lg shadow-lg flex flex-col relative"
            focusAfterOpen={false}
          >
            <div
              ref={popupRef}
              tabIndex={-1}
              className="flex flex-col"
              aria-labelledby={`popup-title-${selectedMarker.id}`}
              aria-describedby={`popup-description-${selectedMarker.id}`}
            >
              <button
                onClick={() => setSelectedMarkerId(null)}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close popup"
              >
                ✖
              </button>

              <img
                src={selectedMarker.image}
                alt={`${selectedMarker.title} Image`}
                className="rounded w-full h-48 object-cover mb-4"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=No+Image+Available";
                }}
              />

              <h3
                id={`popup-title-${selectedMarker.id}`}
                className="text-lg sm:text-xl font-semibold mb-2"
              >
                {selectedMarker.title}
              </h3>

              <p
                id={`popup-description-${selectedMarker.id}`}
                className="text-gray-700 text-base sm:text-lg"
              >
                {selectedMarker.description}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
