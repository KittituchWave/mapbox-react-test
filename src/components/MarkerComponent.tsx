import React from "react";
import { Marker } from "react-map-gl";
import { Sun, AlertTriangle } from "lucide-react";

// Props for MarkerComponent
type MarkerComponentProps = {
  marker: {
    id: number;
    longitude: number;
    latitude: number;
    severity: "warning" | "normal"; // Explicit type
  };
  onClick: () => void;
};

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  marker,
  onClick,
}) => {
  return (
    <Marker
      longitude={marker.longitude}
      latitude={marker.latitude}
      anchor="bottom"
    >
      <div className="cursor-pointer" onClick={onClick}>
        {marker.severity === "warning" ? (
          <AlertTriangle
            className="w-8 h-8 text-red-500 hover:text-red-700"
            aria-hidden="true"
          />
        ) : (
          <Sun
            className="w-8 h-8 text-yellow-400 hover:text-yellow-500"
            aria-hidden="true"
          />
        )}
      </div>
    </Marker>
  );
};

export default MarkerComponent;
