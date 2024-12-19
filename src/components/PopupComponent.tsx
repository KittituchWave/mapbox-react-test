import React from "react";
import { Popup } from "react-map-gl";
import { Sun, AlertTriangle, CheckCircle, Tag, X } from "lucide-react";

// Props for PopupComponent
type PopupComponentProps = {
  selectedPanel: {
    longitude: number;
    latitude: number;
    title: string;
    description: string;
    location: string;
    status: string;
    severity: "warning" | "normal"; // Explicit type
  };
  onClose: () => void;
};

const PopupComponent: React.FC<PopupComponentProps> = ({
  selectedPanel,
  onClose,
}) => {
  return (
    <Popup
      longitude={selectedPanel.longitude}
      latitude={selectedPanel.latitude}
      closeButton={false}
      closeOnClick={false}
      anchor="top"
      className={`rounded-lg shadow-lg max-w-xs p-4 relative ${
        selectedPanel.severity === "warning"
          ? "border-l-4 border-red-500"
          : "border-l-4 border-green-500"
      }`}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid #ccc",
      }}
    >
      {/* Custom Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 shadow-md"
        aria-label="Close popup"
      >
        <X className="w-4 h-4 text-gray-700" />
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
  );
};

export default PopupComponent;
