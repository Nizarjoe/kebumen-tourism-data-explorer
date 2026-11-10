"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MiniMapInner({ lat, lon, nama }: { lat: number; lon: number; nama: string }) {
  return (
    <MapContainer center={[lat, lon]} zoom={14} scrollWheelZoom={false} className="h-full w-full" aria-label={`Peta mini ${nama}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[lat, lon]}
        icon={L.divIcon({
          className: "",
          html: '<span style="display:block;width:16px;height:16px;border-radius:50%;background:#a6533b;border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })}
      >
        <Popup>{nama}</Popup>
      </Marker>
    </MapContainer>
  );
}
