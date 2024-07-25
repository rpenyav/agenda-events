import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapaEventoProps {
  latitud: number;
  longitud: number;
}

const MapaEvento: React.FC<MapaEventoProps> = ({ latitud, longitud }) => {
  useEffect(() => {
    const map = L.map("map").setView([latitud, longitud], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitud, longitud])
      .addTo(map)
      .bindPopup("Ubicación del evento")
      .openPopup();
    return () => {
      map.remove();
    };
  }, [latitud, longitud]);

  const mapStyle = {
    height: "400px",
    width:
      window.innerWidth >= 1200
        ? "600px"
        : window.innerWidth >= 768
        ? "600px"
        : "300px",
  };

  return <div id="map" style={mapStyle}></div>;
};

export default MapaEvento;
